import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

function supportsDirectEsmDotJs() {
  const majorVersion = Number(process.versions.node.split('.')[0]);
  if (majorVersion >= 22) {
    return true;
  }
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'package.json'), 'utf8'));
    return pkg.type === 'module';
  } catch {
    return false;
  }
}

const DIRECT_ESM_JS = supportsDirectEsmDotJs();

/**
 * Load an ES module `.js` file under Node even when `package.json` omits `"type": "module"`.
 * Uses a `data:` ESM URL on Node <22 without `"type": "module"` to avoid CJS fallback warnings.
 */
async function loadEsmModule(relativePath) {
  const absolutePath = path.join(ROOT_DIR, relativePath);
  if (DIRECT_ESM_JS) {
    return import(pathToFileURL(absolutePath).href);
  }
  const source = fs.readFileSync(absolutePath, 'utf8');
  const encoded = Buffer.from(source, 'utf8').toString('base64');
  return import(`data:text/javascript;base64,${encoded}`);
}

const { classMeta, galleryItems, leadership, scheduleDays } = await loadEsmModule(
  'src/data/classProfile.js',
);

const VALID_GALLERY_CATEGORIES = new Set(['lab', 'event', 'outdoor']);
const EXPECTED_DAY_KEYS = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];

const errors = [];
const verifiedImages = new Set();

/** Record a validation failure with contextual path. */
function fail(context, message) {
  errors.push(`[${context}] ${message}`);
}

/** Check whether value is a non-empty trimmed string. */
function assertNonEmptyString(obj, field, context) {
  if (!obj || typeof obj[field] !== 'string' || obj[field].trim().length === 0) {
    fail(context, `Field "${field}" harus berupa string non-kosong.`);
    return false;
  }
  return true;
}

/** Check whether value is a string (empty allowed). */
function assertString(obj, field, context) {
  if (!obj || typeof obj[field] !== 'string') {
    fail(context, `Field "${field}" harus berupa string.`);
    return false;
  }
  return true;
}

/** Check whether value is a boolean. */
function assertBoolean(obj, field, context) {
  if (!obj || typeof obj[field] !== 'boolean') {
    fail(context, `Field "${field}" harus berupa boolean.`);
    return false;
  }
  return true;
}

/** Check whether value is a positive integer. */
function assertPositiveInt(obj, field, context) {
  if (!obj || !Number.isInteger(obj[field]) || obj[field] <= 0) {
    fail(context, `Field "${field}" harus berupa bilangan bulat positif.`);
    return false;
  }
  return true;
}

/** Verify that an `/images/...` path exists and is non-empty under `public/`. */
function assertPublicImageExists(imagePath, context) {
  if (typeof imagePath !== 'string' || !imagePath.startsWith('/images/gallery/')) {
    fail(context, `Path gambar "${String(imagePath)}" harus diawali dengan "/images/gallery/".`);
    return;
  }

  const relativePath = imagePath.replace(/^\/+/, '');
  const absolutePath = path.join(PUBLIC_DIR, relativePath);
  if (!absolutePath.startsWith(PUBLIC_DIR + path.sep)) {
    fail(context, `Path gambar "${imagePath}" keluar dari direktori public/.`);
    return;
  }

  if (!fs.existsSync(absolutePath)) {
    fail(context, `File gambar "${imagePath}" tidak ditemukan di "${absolutePath}".`);
    return;
  }

  const stat = fs.statSync(absolutePath);
  if (!stat.isFile() || stat.size === 0) {
    fail(context, `File gambar "${imagePath}" kosong atau bukan file valid.`);
    return;
  }

  verifiedImages.add(imagePath);
}

/** Validate any `/images/...` values nested inside exported data objects. */
function scanNestedImages(value, context) {
  if (typeof value === 'string') {
    if (value.startsWith('/images/')) {
      assertPublicImageExists(value, context);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => scanNestedImages(item, `${context}[${index}]`));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, nested]) => scanNestedImages(nested, `${context}.${key}`));
  }
}

/** Validate `classMeta` structure. */
function validateClassMeta() {
  const ctx = 'classMeta';
  if (!classMeta || typeof classMeta !== 'object') {
    fail(ctx, 'classMeta harus berupa objek.');
    return;
  }

  [
    'badge',
    'titlePrefix',
    'titleHighlight',
    'subtitle',
    'statusBanner',
    'statusReady',
    'homeroomTeacher',
    'academicYear',
  ].forEach((field) => assertNonEmptyString(classMeta, field, ctx));

  assertPositiveInt(classMeta, 'studentCount', ctx);
  assertPositiveInt(classMeta, 'productiveSubjectsCount', ctx);

  if (!Array.isArray(classMeta.values) || classMeta.values.length === 0) {
    fail(ctx, 'Field "values" harus berupa array non-kosong.');
  } else {
    classMeta.values.forEach((item, index) => {
      assertNonEmptyString(item, 'label', `${ctx}.values[${index}]`);
      assertNonEmptyString(item, 'text', `${ctx}.values[${index}]`);
    });
  }

  if (!Array.isArray(classMeta.socials) || classMeta.socials.length === 0) {
    fail(ctx, 'Field "socials" harus berupa array non-kosong.');
  } else {
    classMeta.socials.forEach((item, index) => {
      const itemCtx = `${ctx}.socials[${index}]`;
      ['label', 'href', 'iconClass', 'hoverClass', 'title'].forEach((field) =>
        assertNonEmptyString(item, field, itemCtx),
      );
    });
  }
}

/** Validate `leadership` structure. */
function validateLeadership() {
  const ctx = 'leadership';
  if (!leadership || typeof leadership !== 'object') {
    fail(ctx, 'leadership harus berupa objek.');
    return;
  }

  if (!leadership.advisor || typeof leadership.advisor !== 'object') {
    fail(ctx, 'Field "advisor" harus berupa objek.');
  } else {
    ['badge', 'name', 'role', 'bio'].forEach((field) =>
      assertNonEmptyString(leadership.advisor, field, `${ctx}.advisor`),
    );
  }

  if (!Array.isArray(leadership.core) || leadership.core.length === 0) {
    fail(ctx, 'Field "core" harus berupa array non-kosong.');
  } else {
    leadership.core.forEach((member, index) => {
      const mCtx = `${ctx}.core[${index}]`;
      ['role', 'name', 'description', 'iconClass', 'badgeClass', 'iconBoxClass'].forEach((field) =>
        assertNonEmptyString(member, field, mCtx),
      );
      assertPositiveInt(member, 'tier', mCtx);
    });
  }

  if (!Array.isArray(leadership.coordinators) || leadership.coordinators.length === 0) {
    fail(ctx, 'Field "coordinators" harus berupa array non-kosong.');
  } else {
    leadership.coordinators.forEach((member, index) => {
      const mCtx = `${ctx}.coordinators[${index}]`;
      ['role', 'name', 'description', 'iconClass', 'roleClass', 'iconBoxClass'].forEach((field) =>
        assertNonEmptyString(member, field, mCtx),
      );
    });
  }
}

/** Validate `galleryItems` entries and image assets. */
function validateGalleryItems() {
  const ctx = 'galleryItems';
  if (!Array.isArray(galleryItems) || galleryItems.length === 0) {
    fail(ctx, 'galleryItems harus berupa array non-kosong.');
    return;
  }

  const seenIds = new Set();
  galleryItems.forEach((item, index) => {
    const itemCtx = `${ctx}[${index}]`;
    [
      'id',
      'category',
      'categoryLabel',
      'title',
      'subtitle',
      'description',
      'image',
      'alt',
      'iconClass',
      'gradientClass',
      'tagClass',
      'labelClass',
    ].forEach((field) => assertNonEmptyString(item, field, itemCtx));

    if (typeof item.id === 'string') {
      if (seenIds.has(item.id)) {
        fail(itemCtx, `Duplikat id galeri "${item.id}".`);
      }
      seenIds.add(item.id);
    }

    if (!VALID_GALLERY_CATEGORIES.has(item.category)) {
      fail(itemCtx, `Kategori galeri "${item.category}" tidak valid (harus lab/event/outdoor).`);
    }

    assertPublicImageExists(item.image, `${itemCtx}.image`);
  });
}

/** Validate `scheduleDays` from Senin to Jumat. */
function validateScheduleDays() {
  const ctx = 'scheduleDays';
  if (!Array.isArray(scheduleDays) || scheduleDays.length === 0) {
    fail(ctx, 'scheduleDays harus berupa array non-kosong.');
    return;
  }

  const seenDays = new Set();
  scheduleDays.forEach((day, index) => {
    const dayCtx = `${ctx}[${index}]`;
    ['dayKey', 'dayName', 'hoursLabel', 'hoursClass'].forEach((field) =>
      assertNonEmptyString(day, field, dayCtx),
    );
    assertPositiveInt(day, 'dayNumber', dayCtx);
    assertBoolean(day, 'isEarlyDismissal', dayCtx);

    if (typeof day.dayKey === 'string') {
      if (seenDays.has(day.dayKey)) {
        fail(dayCtx, `Duplikat dayKey "${day.dayKey}".`);
      }
      seenDays.add(day.dayKey);
    }

    if (!Array.isArray(day.subjects) || day.subjects.length === 0) {
      fail(dayCtx, 'Field "subjects" harus berupa array non-kosong.');
      return;
    }

    day.subjects.forEach((subject, subIndex) => {
      const subCtx = `${dayCtx}.subjects[${subIndex}]`;
      ['name', 'teacher', 'time'].forEach((field) => assertNonEmptyString(subject, field, subCtx));
      ['badgeText', 'note', 'noteTone', 'noteIconClass'].forEach((field) =>
        assertString(subject, field, subCtx),
      );
      assertBoolean(subject, 'isProductive', subCtx);
      assertBoolean(subject, 'isCleaning', subCtx);
    });
  });

  EXPECTED_DAY_KEYS.forEach((dayKey) => {
    if (!seenDays.has(dayKey)) {
      fail(ctx, `Hari "${dayKey}" wajib ada di scheduleDays.`);
    }
  });
}

validateClassMeta();
validateLeadership();
validateGalleryItems();
validateScheduleDays();
scanNestedImages({ classMeta, leadership, galleryItems, scheduleDays }, 'classProfile');

if (errors.length > 0) {
  console.error(`Validasi konten gagal dengan ${errors.length} error:`);
  errors.forEach((err) => console.error(` - ${err}`));
  process.exit(1);
}

console.log(
  `Validasi konten berhasil: ${galleryItems.length} item galeri, ${scheduleDays.length} hari jadwal, dan ${verifiedImages.size} file gambar galeri lokal terverifikasi.`,
);

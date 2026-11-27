import './styles.css';
import { renderLandingContent } from './renderLanding.js';
import { initializeInteractions } from './interactions.js';
import { initializeComments } from './comments.js';
import { createCommentsReference } from './firebase.js';

renderLandingContent();
initializeInteractions();

try {
  initializeComments(createCommentsReference());
} catch (error) {
  initializeComments(null, error);
}

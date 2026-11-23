import './styles.css';
import { initializeComments } from './comments.js';
import { createCommentsReference } from './firebase.js';
import { initializeInteractions } from './interactions.js';

initializeInteractions();

try {
  initializeComments(createCommentsReference());
} catch (error) {
  initializeComments(null, error);
}

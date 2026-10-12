import cobalto from './index.js';

// cargado con <script> arranca solo; con data-cb-manual el init queda en manos del usuario
const script = typeof document !== 'undefined' ? document.currentScript : null;
if (script && !script.hasAttribute('data-cb-manual')) cobalto.autoInit();

export default cobalto;

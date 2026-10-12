import cobalto from './index.js';

// solo arranca solo cuando se carga con <script>; con data-cb-manual el usuario llama init()
const script = typeof document !== 'undefined' ? document.currentScript : null;
if (script && !script.hasAttribute('data-cb-manual')) cobalto.autoInit();

export default cobalto;

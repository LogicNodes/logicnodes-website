document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.interactive-node').forEach((node) => {
      node.addEventListener('mouseenter', () => {
        node.setAttribute('r', '16');
      });
      node.addEventListener('mouseleave', () => {
        node.setAttribute('r', '14');
      });
      node.addEventListener('click', () => {
        alert('This node was clicked. Later this will trigger a pulse.');
      });
    });
  });
  
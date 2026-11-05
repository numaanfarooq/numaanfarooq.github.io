(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce){ document.body.classList.add('anim'); }

  // Signature moment: pointer-reactive 3D tilt on the hero card stack
  var stack = document.getElementById('stack');
  var stage = stack ? stack.parentElement : null;
  if(stack && stage && !reduce && matchMedia('(pointer:fine)').matches){
    stage.addEventListener('pointermove', function(e){
      var r = stage.getBoundingClientRect();
      var x = (e.clientX - r.left)/r.width - .5;
      var y = (e.clientY - r.top)/r.height - .5;
      stack.style.transform = 'rotateY(' + (x*10) + 'deg) rotateX(' + (-y*8) + 'deg)';
    });
    stage.addEventListener('pointerleave', function(){ stack.style.transform = ''; });
  }
})();

// WhatsApp oficial (84) 4042-0431, link enviado pelo gerente em 17/11/2026
var WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=558440420431&text&type=phone_number&app_absent=0';

document.addEventListener('DOMContentLoaded', function () {
  // mobile menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // repassa as UTMs da campanha para a plataforma (antes do #/login)
  var params = new URLSearchParams(window.location.search);
  var utms = new URLSearchParams();
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(function (key) {
    if (params.get(key)) utms.set(key, params.get(key));
  });
  if (utms.toString()) {
    document.querySelectorAll('[data-platform]').forEach(function (link) {
      var url = new URL(link.href);
      utms.forEach(function (value, key) { url.searchParams.set(key, value); });
      link.href = url.toString();
    });
  }

  // H1 por canal: quem vem do Meta (Facebook/Instagram) vê a versão com dor/preço.
  // O H1 padrão (Google) fica no HTML para SEO e Quality Score. Teste: ?utm_source=meta
  var source = (params.get('utm_source') || '').toLowerCase();
  var h1 = document.querySelector('[data-h1-meta]');
  if (h1 && /^(meta|facebook|fb|instagram|ig)/.test(source)) {
    h1.innerHTML = h1.getAttribute('data-h1-meta');
  }

  // WhatsApp
  document.querySelectorAll('.js-whatsapp').forEach(function (link) {
    if (WHATSAPP_URL) {
      link.href = WHATSAPP_URL;
      link.target = '_blank';
      link.rel = 'noopener';
    } else {
      link.addEventListener('click', function (e) { e.preventDefault(); });
    }
  });

  // eventos para o GTM: cliques em "Quero me consultar" e no WhatsApp
  window.dataLayer = window.dataLayer || [];
  document.querySelectorAll('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function () {
      var where = el.getAttribute('data-cta');
      var event = 'clique_consulta';
      if (where.indexOf('whatsapp') === 0) event = 'clique_whatsapp';
      if (where === 'instagram') event = 'clique_instagram';
      window.dataLayer.push({ event: event, cta_posicao: where });
    });
  });

  // evento para o GTM: play no vídeo de apresentação (uma vez por visita)
  var video = document.querySelector('.js-video');
  if (video) {
    video.addEventListener('play', function () {
      window.dataLayer.push({ event: 'play_video_apresentacao' });
    }, { once: true });
  }

  // barra fixa de conversão no mobile: aparece depois que o botão do topo sai da tela
  var bar = document.querySelector('.mbar');
  var heroCta = document.getElementById('hero-cta');
  if (bar && heroCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var on=!entries[0].isIntersecting && entries[0].boundingClientRect.top < 0; bar.classList.toggle('on', on); document.body.classList.toggle('mbar-on', on);
    }).observe(heroCta);
  }

  // FAQ: mantém só uma resposta aberta por vez
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  var year = document.querySelector('.js-year');
  if (year) year.textContent = new Date().getFullYear();
});

// ===== efeitos de navegação =====
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
  document.querySelectorAll('.steps,.cases,.cards,.guar').forEach(function(g){[].forEach.call(g.querySelectorAll('.rv'),function(el,i){el.style.transitionDelay=(i*.08)+'s'})});
  var pg=document.getElementById('prog'),wd=document.getElementById('words'),zm=document.getElementById('zoom'),ws=[];
  if(wd){wd.innerHTML=wd.textContent.split(' ').map(function(w){return '<span>'+w+'</span>'}).join(' ');ws=wd.querySelectorAll('span')}
  function sc(){
    var y=scrollY;pg.style.transform='scaleX('+(y/Math.max(1,document.documentElement.scrollHeight-innerHeight))+')';
    if(reduce)return;
    if(wd){var r=wd.getBoundingClientRect(),t=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));var n=Math.round(t*ws.length);ws.forEach(function(s,i){s.classList.toggle('on',i<n)})}
    if(zm){var z=zm.getBoundingClientRect(),q=Math.min(1,Math.max(0,(innerHeight-z.top)/(innerHeight*.9)));zm.style.transform='scale('+(.85+.15*q)+')'}
  }
  addEventListener('scroll',sc,{passive:true});addEventListener('resize',sc);sc();
  var m=document.getElementById('mock');
  if(false&&m&&matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
    addEventListener('mousemove',function(e){if(scrollY>innerHeight)return;var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;m.style.transform='rotateY('+x*14+'deg) rotateX('+(-y*10)+'deg)'});
  }
})();

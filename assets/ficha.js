/* Ficha da sessão individual — albertodellisola.com.
   Substitui o pop-up do Elementor (id 516), que morreu na migração para o GitHub
   Pages em 19/08/2026: os botões não abriam nada e o formulário postava num
   admin-ajax.php que não existe. Fonte: ~/albertodellisola-novo/remendo-ficha. */
(function () {
  var ENDPOINT = 'https://hpmwhcehqchgswwrowrq.supabase.co/functions/v1/site-ficha';
  var TICTO = 'https://payment.ticto.app/O84BCC7DE';
  var PRECO = 'R$ 1.997';
  var UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // UTMs do link de chegada valem para a visita inteira, mesmo trocando de página.
  var q = new URLSearchParams(location.search);
  function guarda(k, v) {
    try {
      if (v === undefined) return sessionStorage.getItem(k);
      sessionStorage.setItem(k, v);
    } catch (e) { return null; }
  }
  UTM.forEach(function (k) { if (q.get(k)) guarda('ficha_' + k, q.get(k)); });
  function utms() {
    var o = {};
    UTM.forEach(function (k) { var v = q.get(k) || guarda('ficha_' + k); if (v) o[k] = v; });
    return o;
  }
  function linkTicto() {
    var u = new URL(TICTO), o = utms();
    Object.keys(o).forEach(function (k) { u.searchParams.set(k, o[k]); });
    return u.toString();
  }

  var HTML =
    '<div class="ficha-caixa">' +
    '<button type="button" class="ficha-x" aria-label="Fechar">&times;</button>' +

    '<div class="ficha-passo" data-passo="form">' +
    '<p class="ficha-rotulo">Online · cerca de 2 horas · ' + PRECO + '</p>' +
    '<h2 id="ficha-titulo">Sessão individual com Alberto Dell\'Isola</h2>' +
    '<p>A primeira sessão é longa de propósito. Há tempo para entender a sua história, ' +
    'para você experimentar a hipnose na prática e para gravar um áudio de auto-hipnose ' +
    'feito a partir do que apareceu ali.</p>' +
    '<ul class="ficha-inclui">' +
    '<li>Duas horas ao vivo, por videochamada, sempre com o Alberto</li>' +
    '<li>A hipnose aplicada ao seu caso</li>' +
    '<li>Um áudio de auto-hipnose gravado para você usar em casa</li>' +
    '</ul>' +
    '<p class="ficha-preco"><strong>' + PRECO + '</strong>, parcelável no cartão (incidem as taxas da operadora).</p>' +

    '<form novalidate>' +
    '<label class="ficha-campo"><span>Nome completo</span>' +
    '<input name="nome" autocomplete="name" maxlength="120"></label>' +
    '<label class="ficha-campo"><span>E-mail</span>' +
    '<input name="email" type="email" inputmode="email" autocomplete="email" maxlength="160">' +
    '<small>É por ele que o horário é combinado.</small></label>' +
    '<label class="ficha-campo"><span>O que você quer trabalhar na sessão?</span>' +
    '<textarea name="objetivos" rows="4" maxlength="2000" ' +
    'placeholder="Ex.: parar de fumar, dormir melhor, perder o medo de falar em público…"></textarea>' +
    '<small>Poucas linhas bastam. O resto você conta ao Alberto na sessão.</small></label>' +
    '<input class="ficha-mel" name="site" tabindex="-1" autocomplete="off" aria-hidden="true">' +
    '<label class="ficha-aceite"><input type="checkbox" name="consentimento">' +
    '<span>Autorizo o Instituto Dell Isola a usar estes dados, inclusive o que escrevi sobre mim, ' +
    'para responder ao meu pedido, como descrito na ' +
    '<a href="/politica-de-privacidade/" target="_blank" rel="noopener">política de privacidade</a>.</span></label>' +
    '<p class="ficha-erro" role="alert" hidden></p>' +
    '<div class="ficha-botoes">' +
    '<button type="submit" class="ficha-btn ficha-btn-pagar" data-escolha="pagar">Enviar e já pagar · ' + PRECO + '</button>' +
    '<button type="submit" class="ficha-btn ficha-btn-conversar" data-escolha="conversar">Enviar e conversar antes</button>' +
    '</div>' +
    '<p class="ficha-nota">Pagando agora, o horário é combinado por e-mail depois do pagamento. ' +
    'Preferindo conversar antes, o Alberto responde a sua ficha por e-mail e você decide depois.</p>' +
    '</form>' +
    '<p class="ficha-urgencia">A sessão online não é serviço de urgência. Em crise, ligue <strong>188</strong> (CVV), gratuito, 24 horas.</p>' +
    '</div>' +

    '<div class="ficha-passo" data-passo="ok" hidden>' +
    '<h2>Ficha recebida<span class="ficha-nome"></span>.</h2>' +
    '<p>O Alberto vai responder no e-mail <strong class="ficha-email"></strong>. Confira também a caixa de spam.</p>' +
    '<p>Se quiser garantir a sessão agora, o pagamento já está disponível:</p>' +
    '<div class="ficha-botoes">' +
    '<a class="ficha-btn ficha-btn-pagar ficha-link-ticto" href="' + TICTO + '">Pagar ' + PRECO + ' na Ticto</a>' +
    '<button type="button" class="ficha-btn ficha-btn-conversar ficha-fechar">Fechar</button>' +
    '</div></div>' +

    '<div class="ficha-passo" data-passo="indo" hidden>' +
    '<h2>Ficha recebida.</h2>' +
    '<p>Levando você ao pagamento…</p>' +
    '<p><a class="ficha-link-ticto" href="' + TICTO + '">Se a página não abrir, clique aqui.</a></p>' +
    '</div>' +
    '</div>';

  var dlg, form, erro, escolha = 'conversar';

  function passo(nome) {
    dlg.querySelectorAll('.ficha-passo').forEach(function (p) { p.hidden = p.dataset.passo !== nome; });
    dlg.querySelector('.ficha-caixa').scrollTop = 0;
  }

  function monta() {
    if (dlg) return;
    dlg = document.createElement('dialog');
    dlg.id = 'ficha-sessao';
    dlg.setAttribute('aria-labelledby', 'ficha-titulo');
    dlg.innerHTML = HTML;
    document.body.appendChild(dlg);
    form = dlg.querySelector('form');
    erro = dlg.querySelector('.ficha-erro');

    dlg.querySelectorAll('.ficha-x, .ficha-fechar').forEach(function (b) { b.addEventListener('click', fecha); });
    dlg.addEventListener('close', function () { document.documentElement.classList.remove('ficha-aberta'); });
    // Clique no fundo escuro fecha; clique dentro da caixa não.
    dlg.addEventListener('click', function (e) { if (e.target === dlg) fecha(); });
    form.querySelectorAll('[data-escolha]').forEach(function (b) {
      b.addEventListener('click', function () { escolha = b.dataset.escolha; });
    });
    form.addEventListener('submit', envia);
  }

  function abre() {
    monta();
    dlg.querySelectorAll('.ficha-link-ticto').forEach(function (a) { a.href = linkTicto(); });
    if (dlg.open) return;
    document.documentElement.classList.add('ficha-aberta');
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    var primeiro = form.querySelector('input[name=nome]');
    if (!dlg.querySelector('[data-passo=form]').hidden && window.matchMedia('(min-width: 600px)').matches) primeiro.focus();
  }

  function fecha() {
    if (dlg.close) dlg.close(); else dlg.removeAttribute('open');
    document.documentElement.classList.remove('ficha-aberta');
  }

  function mostraErro(msg, campo) {
    erro.innerHTML = msg;
    erro.hidden = false;
    form.querySelectorAll('[aria-invalid]').forEach(function (c) { c.removeAttribute('aria-invalid'); });
    if (campo) { campo.setAttribute('aria-invalid', 'true'); campo.focus(); }
  }

  function envia(e) {
    e.preventDefault();
    var f = form.elements;
    var dados = {
      nome: f.nome.value.trim(),
      email: f.email.value.trim(),
      objetivos: f.objetivos.value.trim(),
      consentimento: f.consentimento.checked,
      quer_pagar: escolha === 'pagar',
      site: f.site.value,
      pagina: location.pathname
    };
    if (dados.nome.length < 2) return mostraErro('Escreva o seu nome completo.', f.nome);
    if (!EMAIL.test(dados.email)) return mostraErro('Confira o e-mail: é por ele que o horário é combinado.', f.email);
    if (dados.objetivos.length < 3) return mostraErro('Conte em poucas palavras o que você quer trabalhar.', f.objetivos);
    if (!dados.consentimento) return mostraErro('Para enviar, marque a autorização.', f.consentimento);
    var o = utms();
    Object.keys(o).forEach(function (k) { dados[k] = o[k]; });

    erro.hidden = true;
    var botoes = form.querySelectorAll('button[type=submit]');
    var clicado = form.querySelector('[data-escolha=' + escolha + ']');
    var rotulo = clicado.textContent;
    botoes.forEach(function (b) { b.disabled = true; });
    clicado.textContent = 'Enviando…';

    fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, j: j }; }); })
      .then(function (res) {
        if (res.status === 200 && res.j.ok) {
          try { (window.dataLayer = window.dataLayer || []).push({ event: 'ficha_enviada', ficha_escolha: escolha }); } catch (x) {}
          if (escolha === 'pagar') {
            passo('indo');
            setTimeout(function () { location.assign(linkTicto()); }, 700);
          } else {
            dlg.querySelector('.ficha-nome').textContent = ', ' + dados.nome.split(/\s+/)[0];
            dlg.querySelector('.ficha-email').textContent = dados.email;
            passo('ok');
          }
          form.reset();
          return;
        }
        if (res.status === 429) throw new Error('Recebemos várias fichas deste endereço há pouco. Tente de novo mais tarde.');
        if (res.status === 422) throw new Error('Confira os campos da ficha e tente de novo.');
        throw new Error('rede');
      })
      .catch(function (x) {
        var msg = x && x.message && x.message !== 'rede' && x.message.indexOf('fetch') < 0 ? x.message
          : 'Não conseguimos enviar agora. Confira a conexão e tente de novo.';
        if (escolha === 'pagar') msg += ' Se preferir, <a class="ficha-link-ticto" href="' + linkTicto() + '">vá direto ao pagamento</a>.';
        mostraErro(msg);
      })
      .then(function () {
        botoes.forEach(function (b) { b.disabled = false; });
        clicado.textContent = rotulo;
      });
  }

  // Os botões da página apontam para #agendar; o capture pega antes de qualquer
  // outro script, inclusive o do Elementor, caso algum ainda aponte para o pop-up.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href$="#agendar"], a[href*="popup%3Aopen"]');
    if (!a) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    abre();
  }, true);

  function pelaUrl() { if (location.hash === '#agendar') abre(); }
  window.addEventListener('hashchange', pelaUrl);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', pelaUrl); else pelaUrl();
})();

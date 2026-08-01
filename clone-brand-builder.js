/* ════════════════════════════════════════════════════════════════
   Clone & Brand Builder — Phase 1 wizard (client-side, no backend yet)
   AvatarAgency.ai
   Captures brand DNA + clone direction → assembles a Brand Blueprint
   whose Avatar Persona maps to LiveAvatar Context fields (Name, Opening
   Intro, Persona, Knowledge, Instructions). "Form now, AI later."
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var LS_KEY = 'cbb_state_v1';

  /* ── State ─────────────────────────────────────────────────── */
  var state = load() || {};
  var stepIndex = 0;

  /* ── Step / field schema ───────────────────────────────────── */
  // Field types: text | textarea | email | select | chips | choices | divider
  var STEPS = [
    { type: 'intro' },
    {
      id: 'you', name: 'About you', kicker: 'Step 1',
      title: 'Let’s start with you.',
      sub: 'So we can address your Blueprint — and send you a copy.',
      fields: [
        { id: 'fullName', type: 'text', label: 'Your name', required: true, placeholder: 'Jane Doe' },
        { id: 'email', type: 'email', label: 'Your email', required: true, placeholder: 'you@example.com', help: 'We’ll send your Brand Blueprint here.' },
        { id: 'company', type: 'text', label: 'Company / brand name', required: true, placeholder: 'Acme Co.' },
        { id: 'website', type: 'text', label: 'Website or main social (optional)', placeholder: 'yourbrand.com' }
      ]
    },
    {
      id: 'path', name: 'Your starting point', kicker: 'Step 2',
      title: 'Where are you starting from?',
      sub: 'This shapes how we build your positioning.',
      fields: [
        { id: 'path', type: 'choices', required: true, options: [
          { value: 'new', title: 'I’m building a new brand', desc: 'We’ll shape your positioning, voice, and clone from scratch.' },
          { value: 'established', title: 'I already have an established brand', desc: 'Tell us what’s working and we’ll build from it.' }
        ] },
        { id: 'existingUrl', type: 'text', label: 'Paste your website or main channel (optional)', placeholder: 'https://…', showIf: function () { return state.path === 'established'; } }
      ]
    },
    {
      id: 'dna1', name: 'Brand DNA', kicker: 'Step 3',
      title: 'Your brand, in essence.',
      fields: [
        { id: 'offer', type: 'textarea', label: 'What does your brand do, in one sentence?', required: true, placeholder: 'We help…' },
        { id: 'audience', type: 'text', label: 'Who is it for?', required: true, placeholder: 'e.g. real estate agents who want to scale' },
        { id: 'problem', type: 'textarea', label: 'What problem do you solve, or what change do you create?', required: true }
      ]
    },
    {
      id: 'dna2', name: 'Brand DNA', kicker: 'Step 4',
      title: 'What sets you apart.',
      fields: [
        { id: 'difference', type: 'textarea', label: 'What makes you different from others doing similar work?', required: true },
        { id: 'personality', type: 'chips', label: 'Pick ~3 words for your brand’s personality', required: true,
          options: ['Bold', 'Warm', 'Authoritative', 'Playful', 'Premium', 'Approachable', 'Visionary', 'Trustworthy', 'Energetic', 'Sophisticated', 'Rebellious', 'Caring'] },
        { id: 'goal', type: 'textarea', label: 'What do you want people to feel or do after seeing your content? (optional)' }
      ]
    },
    {
      id: 'clone1', name: 'Your clone', kicker: 'Step 5',
      title: 'Now — your clone.',
      sub: 'The AI avatar that will represent your brand on camera.',
      fields: [
        { id: 'useCase', type: 'select', label: 'Primary use case', required: true,
          options: ['Author / Personal Brand', 'Real Estate', 'Business / Corporate', 'Other'] },
        { id: 'avatarType', type: 'choices', required: true, label: 'Who should your clone be?', options: [
          { value: 'you', title: 'A version of you', desc: 'Your real likeness, cloned.' },
          { value: 'host', title: 'A spokesperson / host', desc: 'A presenter for your brand.' },
          { value: 'character', title: 'A brand character', desc: 'An original persona — like Ethica.' }
        ] },
        { id: 'avatarName', type: 'text', label: 'Give your clone a name & one-line role', required: true, placeholder: 'e.g. Ethica — Financial Fraud Fighter' },
        { id: 'openingIntro', type: 'textarea', label: 'How should it greet someone? (optional — we’ll write one if blank)', placeholder: 'Hey there — I’m…' }
      ]
    },
    {
      id: 'clone2', name: 'Look & voice', kicker: 'Step 6',
      title: 'Look & voice.',
      fields: [
        { id: 'lookVibe', type: 'chips', label: 'Look & vibe', options: ['Professional', 'Casual', 'Luxury', 'Futuristic', 'Friendly', 'Edgy', 'Warm', 'Corporate', 'Cinematic'] },
        { id: 'faceSource', type: 'select', label: 'Do you have a face source?', options: ['I’ll upload a photo', 'Design a synthetic face for me', 'Decide later'] },
        { id: 'voiceVibe', type: 'chips', label: 'Voice direction', options: ['Warm', 'Authoritative', 'Energetic', 'Calm', 'Friendly', 'Accented', 'Soothing', 'Confident'] },
        { id: 'channels', type: 'chips', label: 'Where will your clone show up?', options: ['Short-form video', 'YouTube', 'Website embed', 'Ads', 'Listings', 'Courses', 'Email'] }
      ]
    },
    {
      id: 'clone3', name: 'Knowledge & rules', kicker: 'Step 7',
      title: 'What your clone knows & how it behaves.',
      sub: 'This becomes its brain. The optional fields make a richer clone.',
      fields: [
        { id: 'expertise', type: 'textarea', label: 'What is your clone an expert in?', required: true, help: 'Topics & problems it should speak to with authority.' },
        { id: 'framework', type: 'text', label: 'Signature framework, method, or acronym? (optional)', placeholder: 'e.g. PDR — Prevention, Detection, Remediation' },
        { id: 'ctaPromote', type: 'textarea', label: 'What should your clone promote, and where should it send people? (optional)', placeholder: 'e.g. Visit AvatarAgency.ai to learn more' },
        { id: 'convoRules', type: 'chips', label: 'Conversation rules', options: ['Keep replies short', 'End with a question', 'Stay in character', 'Mention the brand occasionally', 'No legal advice', 'No medical advice', 'No financial advice'] },
        { id: '_depth', type: 'divider', label: 'Optional depth — great for a richer clone' },
        { id: 'talkingPoints', type: 'textarea', label: '3–5 things your clone should teach or repeat often (optional)' },
        { id: 'originStory', type: 'textarea', label: 'Origin story / backstory (optional)' },
        { id: 'humanDetails', type: 'text', label: 'Humanizing details — pets, hobbies, quirks (optional)' },
        { id: 'guardrails', type: 'text', label: 'Anything it should always / never do or say? (optional)' }
      ]
    },
    { type: 'result' }
  ];

  // Indices that count toward the progress bar (the real form steps)
  var FORM_STEPS = STEPS.map(function (s, i) { return s.fields ? i : -1; }).filter(function (i) { return i >= 0; });

  /* ── Element refs ──────────────────────────────────────────── */
  var stage = document.getElementById('cbb-stage');
  var nav = document.getElementById('cbb-nav');
  var backBtn = document.getElementById('cbb-back');
  var nextBtn = document.getElementById('cbb-next');
  var progress = document.getElementById('cbb-progress');
  var progFill = document.getElementById('cbb-progress-fill');
  var progStep = document.getElementById('cbb-progress-step');
  var progName = document.getElementById('cbb-progress-name');
  var egLine = document.getElementById('cbb-eg');

  /* ── Render ────────────────────────────────────────────────── */
  function render() {
    var step = STEPS[stepIndex];
    stage.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (step.type === 'intro') return renderIntro();
    if (step.type === 'result') return renderResult();

    progress.hidden = false;
    nav.hidden = false;
    egLine.style.display = '';
    var pos = FORM_STEPS.indexOf(stepIndex);
    progStep.textContent = 'Step ' + (pos + 1) + ' of ' + FORM_STEPS.length;
    progName.textContent = step.name || '';
    progFill.style.width = (((pos + 1) / FORM_STEPS.length) * 100) + '%';

    var head = el('div');
    head.innerHTML = '<div class="cbb-step-kicker">' + esc(step.kicker || '') + '</div>' +
      '<h2 class="cbb-step-title">' + esc(step.title) + '</h2>' +
      (step.sub ? '<p class="cbb-step-sub">' + esc(step.sub) + '</p>' : '');
    stage.appendChild(head);

    step.fields.forEach(function (f) {
      if (f.showIf && !f.showIf()) return;
      stage.appendChild(renderField(f));
    });

    backBtn.hidden = (pos === 0);
    nextBtn.lastChild.nodeType; // noop
    setNextLabel(stepIndex === STEPS.length - 2 ? 'Generate my Blueprint' : 'Continue');
  }

  function renderField(f) {
    var wrap = el('div', 'cbb-field');
    wrap.dataset.fid = f.id;

    if (f.type === 'divider') {
      wrap.className = 'cbb-divider';
      wrap.innerHTML = '<span>' + esc(f.label) + '</span>';
      return wrap;
    }

    if (f.label) {
      var lab = el('label');
      lab.setAttribute('for', 'f-' + f.id);
      lab.innerHTML = esc(f.label) + (f.required ? ' <span class="cbb-req">*</span>' : '');
      wrap.appendChild(lab);
    }
    if (f.help) { var h = el('div', 'cbb-help'); h.textContent = f.help; wrap.appendChild(h); }

    var val = state[f.id];

    if (f.type === 'text' || f.type === 'email') {
      var inp = el('input', 'cbb-input');
      inp.type = f.type === 'email' ? 'email' : 'text';
      inp.id = 'f-' + f.id;
      inp.placeholder = f.placeholder || '';
      if (val) inp.value = val;
      inp.addEventListener('input', function () { state[f.id] = inp.value; clearError(wrap); save(); });
      wrap.appendChild(inp);

    } else if (f.type === 'textarea') {
      var ta = el('textarea', 'cbb-textarea');
      ta.id = 'f-' + f.id;
      ta.placeholder = f.placeholder || '';
      if (val) ta.value = val;
      ta.addEventListener('input', function () { state[f.id] = ta.value; clearError(wrap); save(); });
      wrap.appendChild(ta);

    } else if (f.type === 'select') {
      var sel = el('select', 'cbb-select');
      sel.id = 'f-' + f.id;
      sel.appendChild(opt('', 'Select one…'));
      f.options.forEach(function (o) { sel.appendChild(opt(o, o)); });
      if (val) sel.value = val;
      sel.addEventListener('change', function () { state[f.id] = sel.value; clearError(wrap); save(); });
      wrap.appendChild(sel);

    } else if (f.type === 'chips') {
      var box = el('div', 'cbb-chips');
      var chosen = Array.isArray(val) ? val.slice() : [];
      f.options.forEach(function (o) {
        var c = el('button', 'cbb-chip');
        c.type = 'button';
        c.textContent = o;
        if (chosen.indexOf(o) > -1) c.classList.add('is-on');
        c.addEventListener('click', function () {
          var i = chosen.indexOf(o);
          if (i > -1) { chosen.splice(i, 1); c.classList.remove('is-on'); }
          else { chosen.push(o); c.classList.add('is-on'); }
          state[f.id] = chosen.slice();
          clearError(wrap); save();
        });
        box.appendChild(c);
      });
      wrap.appendChild(box);

    } else if (f.type === 'choices') {
      var grid = el('div', 'cbb-choices');
      f.options.forEach(function (o) {
        var c = el('button', 'cbb-choice');
        c.type = 'button';
        c.innerHTML = '<div class="cbb-choice-title">' + esc(o.title) + '</div><div class="cbb-choice-desc">' + esc(o.desc) + '</div>';
        if (val === o.value) c.classList.add('is-on');
        c.addEventListener('click', function () {
          state[f.id] = o.value;
          grid.querySelectorAll('.cbb-choice').forEach(function (x) { x.classList.remove('is-on'); });
          c.classList.add('is-on');
          clearError(wrap); save();
          if (f.id === 'path') render(); // reveal conditional field
        });
        grid.appendChild(c);
      });
      wrap.appendChild(grid);
    }

    var err = el('div', 'cbb-error');
    err.textContent = 'This one’s required.';
    wrap.appendChild(err);
    return wrap;
  }

  function renderIntro() {
    progress.hidden = true;
    nav.hidden = true;
    egLine.style.display = '';
    var d = el('div');
    d.style.textAlign = 'center';
    var check = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5l4 4 8-9"/></svg>';
    d.innerHTML =
      '<div class="cbb-step-kicker" style="text-align:center;">~3 minutes · Free</div>' +
      '<h2 class="cbb-step-title" style="text-align:center;">Here’s what you’ll get.</h2>' +
      '<div class="cbb-intro-points">' +
        '<div class="cbb-intro-point">' + check + '<span><strong>Brand positioning, voice & 3 content pillars</strong> — built from who you actually are.</span></div>' +
        '<div class="cbb-intro-point">' + check + '<span><strong>A custom AI clone persona</strong> — name, personality, knowledge, and on-camera style.</span></div>' +
        '<div class="cbb-intro-point">' + check + '<span><strong>Your first 5 content ideas</strong> — ready to film with your clone.</span></div>' +
      '</div>';
    var start = el('button', 'btn btn-ink');
    start.type = 'button';
    start.style.margin = '0 auto';
    start.innerHTML = 'Start building &nbsp;<svg class="glyph-arrow arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>';
    start.addEventListener('click', function () { go(1); });
    d.appendChild(start);
    stage.appendChild(d);
  }

  /* ── Navigation ────────────────────────────────────────────── */
  function go(i) { stepIndex = Math.max(0, Math.min(STEPS.length - 1, i)); render(); }

  function validateStep() {
    var step = STEPS[stepIndex];
    if (!step.fields) return true;
    var ok = true, firstBad = null;
    step.fields.forEach(function (f) {
      if (!f.required) return;
      if (f.showIf && !f.showIf()) return;
      var v = state[f.id];
      var empty = (f.type === 'chips') ? !(Array.isArray(v) && v.length) : !(v && String(v).trim());
      if (empty) {
        ok = false;
        var node = stage.querySelector('[data-fid="' + f.id + '"]');
        if (node) { node.classList.add('has-error'); if (!firstBad) firstBad = node; }
      }
    });
    if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return ok;
  }

  nextBtn.addEventListener('click', function () {
    if (!validateStep()) return;
    if (stepIndex === STEPS.length - 2) {
      try { gtag('event', 'clone_brand_builder_complete'); } catch (e) {}
    }
    go(stepIndex + 1);
  });
  backBtn.addEventListener('click', function () { go(stepIndex - 1); });

  function setNextLabel(txt) {
    nextBtn.firstChild.nodeValue = txt + ' ';
  }

  function clearError(node) { node.classList.remove('has-error'); }

  /* ── Ethica sample ─────────────────────────────────────────── */
  document.getElementById('cbb-load-ethica').addEventListener('click', function () {
    state = ETHICA_SAMPLE();
    save();
    go(STEPS.length - 1);
  });

  function ETHICA_SAMPLE() {
    return {
      fullName: 'Michael Rivera', email: 'michael@avataragency.ai', company: 'AvatarAgency', website: 'avataragency.ai',
      path: 'new',
      offer: 'AvatarAgency clones people and brands into AI avatars that create weeks of professional video from a single session.',
      audience: 'Real estate agents, business owners, and authors who want to show up everywhere without a film crew.',
      problem: 'Creating consistent, professional video is expensive, slow, and means showing up on camera over and over again.',
      difference: 'One cloning session produces all your future content — no crew, no studio, no recurring production cost.',
      personality: ['Visionary', 'Trustworthy', 'Bold'],
      goal: 'Feel that professional video is finally effortless — and book a cloning session.',
      useCase: 'Business / Corporate',
      avatarType: 'character',
      avatarName: 'Ethica — Financial Fraud Fighter & Accounting Justice Hero',
      openingIntro: 'Hey there — I’m Ethica. By day I’m Marissa Brooks, a quiet accountant who discovered something in the numbers that couldn’t be ignored. Now I’m here to help you understand fraud, protect your finances, and fight back against the schemes that cost real people everything. So tell me — what brought you here today?',
      lookVibe: ['Professional', 'Cinematic', 'Friendly'],
      faceSource: 'I’ll upload a photo',
      voiceVibe: ['Warm', 'Confident', 'Authoritative'],
      channels: ['Short-form video', 'Website embed', 'YouTube'],
      expertise: 'Financial fraud — money laundering, pyramid schemes, investment scams, counterfeit currency, corporate fraud, embezzlement, point-of-sale theft, and credit card fraud. Forensic accounting and fraud prevention.',
      framework: 'PDR — Prevention, Detection, Remediation. Plus F.U.N. — Flowing and Flourishing Understanding Numbers.',
      ctaPromote: 'Ethica was created by AvatarAgency.ai — visit AvatarAgency.ai to learn more.',
      convoRules: ['Keep replies short', 'End with a question', 'Stay in character', 'Mention the brand occasionally'],
      talkingPoints: 'Always use dual authorization for large transactions. Use strong, unique passwords and change them regularly. Maintain approved vendor lists. Reconcile bank statements monthly. Separate financial duties so no single person controls a whole transaction.',
      originStory: 'Marissa Brooks, a 23-year-old junior accountant, discovered fraud committed by her boss, Victor Crane. Silenced and threatened, she transformed — with AvatarAgency’s help — into Ethica, a superhero for financial justice. Her story is about going from surviving to thriving.',
      humanDetails: 'Her puppy is her faithful companion. She loves road trips and international travel.',
      guardrails: 'Never talk down to people. Stay encouraging. Make accounting feel approachable — and F.U.N.'
    };
  }

  /* ── Blueprint generation (client-side templating) ─────────── */
  function renderResult() {
    progress.hidden = true;
    nav.hidden = true;
    egLine.style.display = 'none';
    try { gtag('event', 'clone_brand_builder_blueprint_view'); } catch (e) {}

    var s = state;
    var brand = s.company || 'Your brand';
    var pers0 = (s.personality && s.personality[0]) || 'distinctive';
    var voiceWords = (s.personality && s.personality.length) ? s.personality.join(', ').toLowerCase() : 'clear and authentic';

    var positioning = cap(firstSentence(s.offer || (brand + ' helps its audience.'))) + ' ' +
      'It’s built for ' + lc(stripPeriod(s.audience || 'its audience')) + '. ' +
      (s.problem ? 'The problem it solves: ' + stripPeriod(s.problem) + '. ' : '') +
      'What sets it apart — ' + stripPeriod(s.difference || 'a genuinely different approach') + '.';

    var pillars = derivePillars(s);
    var ideas = deriveIdeas(s, pillars);
    var la = deriveLiveAvatar(s);

    var html = '';
    html += '<div class="cbb-bp-head">' +
      '<div class="cbb-step-kicker" style="text-align:center;">Clone &amp; Brand Builder</div>' +
      '<h2 class="cbb-step-title" style="text-align:center;">' + esc(brand) + '</h2>' +
      '</div>';

    html += section('01 · Positioning', 'Where you stand', '<p>' + esc(positioning) + '</p>');

    html += section('02 · Ideal Audience', 'Who you’re for',
      '<p><strong>' + esc(cap(s.audience || '—')) + '</strong></p>' +
      '<p>' + esc(cap(stripPeriod(s.problem || ''))) + '.</p>');

    var pillHtml = '<div class="cbb-pillars">';
    pillars.forEach(function (p) { pillHtml += '<div class="cbb-pillar"><h4>' + esc(p.title) + '</h4><p>' + esc(p.desc) + '</p></div>'; });
    pillHtml += '</div>';
    html += section('03 · Content Pillars', 'The 3 themes everything maps to', pillHtml);

    html += section('04 · Brand Voice', 'How you sound',
      '<p>Your brand sounds <strong>' + esc(voiceWords) + '</strong>.</p>' +
      '<p>We sound like a ' + esc(lc(pers0)) + ', trusted guide — not a faceless corporation or a hype machine.</p>');

    html += section('05 · Visual Direction', 'The look & feel',
      '<p><strong>Mood:</strong> ' + esc(joinList(s.lookVibe, 'polished & clear')) + '.</p>' +
      '<p><strong>Suggested palette:</strong> a confident neutral base, one signature accent, and high-contrast type for authority.</p>');

    // Avatar Persona — friendly + LiveAvatar fields
    var apFriendly =
      '<p><strong>' + esc(la.name) + '</strong> — ' + esc(avatarTypeLabel(s.avatarType)) + '.</p>' +
      '<p>' + esc(la.personaShort) + '</p>' +
      '<p><strong>Voice:</strong> ' + esc(joinList(s.voiceVibe, 'warm & confident')) + ' &nbsp;·&nbsp; <strong>Shows up on:</strong> ' + esc(joinList(s.channels, 'video & web')) + '</p>';
    var apLive =
      '<div class="cbb-la">' +
      '<p class="cbb-la-intro">★ Production-ready: these fields drop straight into LiveAvatar (the platform behind your live clone) — Name, Opening Intro, and one merged prompt of Persona + Knowledge + Instructions.</p>' +
      laField('Context Name', la.name) +
      laField('Opening Intro', la.openingIntro) +
      laField('Full Prompt (Persona + Knowledge + Instructions)', la.fullPrompt) +
      '</div>';
    html += section('06 · ★ Your Clone Persona', 'Your brand, brought to life on camera', apFriendly + apLive);

    var ideasHtml = '<ul class="cbb-ideas">';
    ideas.forEach(function (i) { ideasHtml += '<li>' + esc(i) + '</li>'; });
    ideasHtml += '</ul>';
    html += section('07 · First 5 Content Ideas', 'Ready to film with your clone', ideasHtml);

    html += '<div class="cbb-result-cta">' +
      '<h3>Ready to make ' + esc(shortName(la.name)) + ' real?</h3>' +
      '<p>We’ll clone your likeness and voice, then turn this Blueprint into weeks of professional video.</p>' +
      '<div class="cbb-cta-row">' +
      '<a href="https://calendly.com/michaelrivera007/free-consultation-meeting" target="_blank" rel="noopener" class="btn btn-gold">Book a strategy call <svg class="glyph-arrow arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg></a>' +
      '<a href="contact.html" class="btn btn-outline">Contact us</a>' +
      '</div></div>';

    stage.innerHTML = html;

    var restart = el('button', 'cbb-restart');
    restart.type = 'button';
    restart.textContent = 'Start over';
    restart.addEventListener('click', function () {
      if (confirm('Clear your answers and start a new Blueprint?')) {
        state = {}; save(); go(0);
      }
    });
    stage.appendChild(restart);

    stage.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pre = btn.closest('.cbb-la-field').querySelector('pre');
        copyText(pre.textContent);
        var old = btn.textContent; btn.textContent = 'Copied ✓';
        setTimeout(function () { btn.textContent = old; }, 1400);
      });
    });
  }

  function section(label, title, body) {
    return '<div class="cbb-bp-section"><div class="cbb-bp-label">' + esc(label) + '</div>' +
      '<h3>' + esc(title) + '</h3>' + body + '</div>';
  }
  function laField(label, value) {
    return '<div class="cbb-la-field"><div class="cbb-la-field-head">' +
      '<span class="cbb-la-field-label">' + esc(label) + '</span>' +
      '<button type="button" class="cbb-copy" data-copy>Copy</button></div>' +
      '<pre>' + esc(value) + '</pre></div>';
  }

  function derivePillars(s) {
    var topic = shortPhrase(s.expertise || s.offer || 'your field');
    var outcome = shortPhrase(s.problem || 'the change you create');
    return [
      { title: 'Educate', desc: 'Teach your audience about ' + lc(topic) + ' — practical, jargon-free, genuinely useful.' },
      { title: 'Demonstrate', desc: 'Show the transformation: proof, results, and stories around ' + lc(outcome) + '.' },
      { title: 'Connect', desc: 'Build trust through the human side of ' + esc(s.company || 'your brand') + ' — your story, values, and personality.' }
    ];
  }

  function deriveIdeas(s, pillars) {
    var topic = shortPhrase(s.expertise || s.offer || 'your work');
    var aud = lc(s.audience || 'your audience');
    var name = shortName(s.avatarName || 'your clone');
    return [
      name + ' explains the #1 thing ' + aud + ' get wrong about ' + lc(topic) + '.',
      'A 60-second “myth vs. truth” on ' + lc(topic) + ', delivered straight to camera.',
      (s.framework ? 'Walk through your “' + shortName(s.framework) + '” framework in one short video.' : 'Break your core method into a simple 3-step framework on camera.'),
      'Answer the question ' + aud + ' are too afraid to ask.',
      'A short origin story: why ' + esc(s.company || 'your brand') + ' exists — ending with a clear next step.'
    ];
  }

  function deriveLiveAvatar(s) {
    var name = s.avatarName || (s.company ? s.company + ' Host' : 'Your Clone');
    var greeting = s.openingIntro && s.openingIntro.trim()
      ? s.openingIntro.trim()
      : 'Hi, I’m ' + shortName(name) + ', here on behalf of ' + (s.company || 'our team') + '. ' +
        'I can help you with ' + lc(shortPhrase(s.expertise || s.offer || 'what we do')) + '. What brought you here today?';

    // PERSONA
    var persona = shortName(name) + ' is ' + avatarTypeLabel(s.avatarType) + ' for ' + (s.company || 'the brand') + '. ';
    if (s.personality && s.personality.length) persona += 'Personality: ' + s.personality.join(', ').toLowerCase() + '. ';
    persona += 'Speaks to: ' + stripPeriod(s.audience || 'the audience') + '. ';
    if (s.problem) persona += 'Helps them with: ' + stripPeriod(s.problem) + '. ';
    if (s.difference) persona += 'What makes them different: ' + stripPeriod(s.difference) + '. ';
    if (s.originStory) persona += '\n\nORIGIN: ' + s.originStory.trim();
    var personaShort = shortName(name) + ' is ' + avatarTypeLabel(s.avatarType) +
      (s.personality && s.personality.length ? ' — ' + s.personality.join(', ').toLowerCase() : '') +
      ', speaking to ' + lc(s.audience || 'your audience') + '.';

    // KNOWLEDGE
    var knowledge = '';
    if (s.expertise) knowledge += 'EXPERTISE: ' + s.expertise.trim() + '\n\n';
    if (s.framework) knowledge += 'SIGNATURE FRAMEWORK: ' + s.framework.trim() + '\n\n';
    if (s.talkingPoints) knowledge += 'KEY TALKING POINTS: ' + s.talkingPoints.trim() + '\n\n';
    if (s.humanDetails) knowledge += 'HUMAN DETAILS: ' + s.humanDetails.trim() + '\n\n';
    if (s.ctaPromote) knowledge += 'BRAND CONNECTION & CTA: ' + s.ctaPromote.trim();
    if (!knowledge) knowledge = 'EXPERTISE: ' + (s.offer || 'See brand positioning above.');

    // INSTRUCTIONS
    var instr = [];
    if (s.convoRules && s.convoRules.length) {
      s.convoRules.forEach(function (r) {
        var map = {
          'Keep replies short': 'Keep replies short — under ~60 words.',
          'End with a question': 'End most replies with a question to keep the conversation going.',
          'Stay in character': 'Always stay in character.',
          'Mention the brand occasionally': 'Mention ' + (s.company || 'the brand') + ' occasionally.',
          'No legal advice': 'Never give legal advice.',
          'No medical advice': 'Never give medical advice.',
          'No financial advice': 'Never give personalized financial advice.'
        };
        instr.push('- ' + (map[r] || r));
      });
    }
    if (s.guardrails) instr.push('- ' + stripPeriod(s.guardrails) + '.');
    if (!instr.length) instr.push('- Stay in character, be helpful and concise, and guide the viewer toward a clear next step.');

    var fullPrompt =
      '## PERSONA\n' + persona.trim() + '\n\n' +
      '## KNOWLEDGE\n' + knowledge.trim() + '\n\n' +
      '## INSTRUCTIONS\n' + instr.join('\n');

    return { name: name, openingIntro: greeting, personaShort: personaShort, fullPrompt: fullPrompt };
  }

  function avatarTypeLabel(t) {
    if (t === 'you') return 'a cloned version of you';
    if (t === 'host') return 'a spokesperson & host';
    if (t === 'character') return 'an original brand character';
    return 'your brand’s on-camera presence';
  }

  /* ── Small helpers ─────────────────────────────────────────── */
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function opt(v, t) { var o = document.createElement('option'); o.value = v; o.textContent = t; return o; }
  function esc(str) { return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function lc(s) { s = String(s || '').trim(); return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function cap(s) { s = String(s || '').trim(); return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function stripPeriod(s) { return String(s || '').trim().replace(/[.!]+$/, ''); }
  function firstSentence(s) { var m = String(s || '').split(/(?<=[.!?])\s/); return (m[0] || s || '').trim(); }
  function firstClause(s) { return stripPeriod(String(s || '').split(/[,;.]/)[0] || s); }
  function shortPhrase(s) { s = stripPeriod(String(s || '').split(/[.;\n]/)[0] || ''); return s.length > 90 ? s.slice(0, 88).trim() + '…' : s; }
  function shortName(s) { return String(s || '').split(/[—\-:|,]/)[0].trim() || s; }
  function joinList(arr, fallback) { return (Array.isArray(arr) && arr.length) ? arr.join(', ') : fallback; }

  function copyText(t) {
    if (navigator.clipboard) { navigator.clipboard.writeText(t); return; }
    var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta);
  }
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch (e) { return null; } }

  /* ── Boot ──────────────────────────────────────────────────── */
  render();
})();

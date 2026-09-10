/**
 * SAT 1500+ Trajectory — Application Logic
 * Ashkan's Personal Study Tracker
 */

(function () {
  'use strict';

  // Storage Keys
  const STORAGE_KEY_CHECKLIST = 'sat-plan-checklist';
  const STORAGE_KEY_SCORES = 'sat-plan-scores';

  // Global State
  let checklistState = {};
  let scoresState = [];
  let flatDaysList = [];
  let activeDayIndex = -1;

  // DOM Elements Cache
  const elements = {
    // Hero & Metrics
    metricCurrentWeek: document.getElementById('metricCurrentWeek'),
    metricWeekRange: document.getElementById('metricWeekRange'),
    metricCheckpointDays: document.getElementById('metricCheckpointDays'),
    metricSittingDays: document.getElementById('metricSittingDays'),
    metricCompletedCount: document.getElementById('metricCompletedCount'),
    metricCompletedPercent: document.getElementById('metricCompletedPercent'),
    progressHeaderStats: document.getElementById('progressHeaderStats'),
    mainProgressFill: document.getElementById('mainProgressFill'),
    heroTrajectoryBadge: document.getElementById('heroTrajectoryBadge'),

    // Navigation Tabs
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabPanels: document.querySelectorAll('.tab-panel'),
    scoresTabCount: document.getElementById('scoresTabCount'),

    // Plan Tab
    weeksListContainer: document.getElementById('weeksListContainer'),
    expandAllWeeksBtn: document.getElementById('expandAllWeeksBtn'),
    collapseAllWeeksBtn: document.getElementById('collapseAllWeeksBtn'),

    // Scores Tab
    scoreEntryForm: document.getElementById('scoreEntryForm'),
    scoreTestName: document.getElementById('scoreTestName'),
    scoreDate: document.getElementById('scoreDate'),
    scoreRw: document.getElementById('scoreRw'),
    scoreMath: document.getElementById('scoreMath'),
    previewTotalScore: document.getElementById('previewTotalScore'),
    scoreTableBody: document.getElementById('scoreTableBody'),
    scoreHistoryCount: document.getElementById('scoreHistoryCount'),
    scoreChartSvg: document.getElementById('scoreChartSvg'),
    chartTooltip: document.getElementById('chartTooltip'),
    svgChartWrapper: document.getElementById('svgChartWrapper'),

    // Toolkit & Reference Tabs
    toolkitGrid: document.getElementById('toolkitGrid'),
    formulasGrid: document.getElementById('formulasGrid'),
    startHereGrid: document.getElementById('startHereGrid'),
    channelsGrid: document.getElementById('channelsGrid'),
    tipsListContainer: document.getElementById('tipsListContainer'),

    // Modal Elements
    dayModalBackdrop: document.getElementById('dayModalBackdrop'),
    dayModalCard: document.getElementById('dayModalCard'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalWeekPhase: document.getElementById('modalWeekPhase'),
    modalDayDate: document.getElementById('modalDayDate'),
    modalSubjTag: document.getElementById('modalSubjTag'),
    modalHoursTag: document.getElementById('modalHoursTag'),
    modalObjectiveText: document.getElementById('modalObjectiveText'),
    modalTotalDurationLabel: document.getElementById('modalTotalDurationLabel'),
    modalTimelineBar: document.getElementById('modalTimelineBar'),
    modalTimelineLegend: document.getElementById('modalTimelineLegend'),
    modalSessionFlow: document.getElementById('modalSessionFlow'),
    modalTipCallout: document.getElementById('modalTipCallout'),
    modalTipContent: document.getElementById('modalTipContent'),
    modalCheckmark: document.getElementById('modalCheckmark'),
    modalCompletionStatus: document.getElementById('modalCompletionStatus'),
    modalPrevDayBtn: document.getElementById('modalPrevDayBtn'),
    modalNextDayBtn: document.getElementById('modalNextDayBtn'),
    modalNavDayCounter: document.getElementById('modalNavDayCounter')
  };

  /* ==========================================================================
     1. Storage Management (Safe LocalStorage)
     ========================================================================== */

  function loadStorageData() {
    // Load Checklist
    try {
      const storedChecklist = localStorage.getItem(STORAGE_KEY_CHECKLIST);
      if (storedChecklist) {
        checklistState = JSON.parse(storedChecklist) || {};
      } else {
        checklistState = {};
      }
    } catch (err) {
      console.warn('Failed to read sat-plan-checklist from localStorage:', err);
      checklistState = {};
    }

    // Load Scores
    try {
      const storedScores = localStorage.getItem(STORAGE_KEY_SCORES);
      if (storedScores) {
        scoresState = JSON.parse(storedScores) || [];
      } else {
        scoresState = [];
      }
    } catch (err) {
      console.warn('Failed to read sat-plan-scores from localStorage:', err);
      scoresState = [];
    }

    // Ensure baseline diagnostic is present in score list if empty
    if (!scoresState || scoresState.length === 0) {
      scoresState = [{
        date: BASELINE.date,
        total: BASELINE.total,
        rw: BASELINE.rw,
        math: BASELINE.math,
        name: 'Baseline Diagnostic'
      }];
      saveScoresData();
    }
  }

  function saveChecklistData() {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(checklistState));
    } catch (err) {
      console.warn('Failed to save sat-plan-checklist to localStorage:', err);
    }
  }

  function saveScoresData() {
    try {
      localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(scoresState));
    } catch (err) {
      console.warn('Failed to save sat-plan-scores to localStorage:', err);
    }
  }

  /* ==========================================================================
     2. Data Modeling & Helpers
     ========================================================================== */

  function buildFlatDays() {
    flatDaysList = [];
    WEEKS.forEach(week => {
      week.days.forEach(day => {
        flatDaysList.push({
          ...day,
          weekNum: week.n,
          weekRange: week.range,
          weekPhase: week.phase
        });
      });
    });
  }

  function parseMinutesFromHours(hrs) {
    if (!hrs || hrs === '—') return 0;
    const clean = hrs.trim().toLowerCase();
    if (clean === '1h') return 60;
    if (clean === '1.5h') return 90;
    if (clean === '2.5h') return 150;
    if (clean === '0.5h') return 30;
    if (clean.includes('h')) {
      const val = parseFloat(clean.replace('h', ''));
      if (!isNaN(val)) return Math.round(val * 60);
    }
    if (clean.includes('min')) {
      const val = parseInt(clean.replace('min', ''), 10);
      if (!isNaN(val)) return val;
    }
    return 60;
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }

  function formatShortDate(dateStr, dayOfWeek) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const day = parts[2];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[parseInt(parts[1], 10) - 1];
    return `${dayOfWeek} ${day} ${month}`;
  }

  function getSubjectTagConfig(subj) {
    switch (subj) {
      case 'math':
        return {
          code: 'MATH',
          name: 'Math',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 3 18 18"/><path d="M14 3h7v7"/><path d="M10 21H3v-7"/></svg>'
        };
      case 'eng':
        return {
          code: 'ENG',
          name: 'English',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>'
        };
      case 'mix':
        return {
          code: 'MIXED',
          name: 'Mixed',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
        };
      case 'test':
        return {
          code: 'TEST DAY',
          name: 'Test Day',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
        };
      case 'log':
        return {
          code: 'LOGISTICS',
          name: 'Logistics',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>'
        };
      default:
        return {
          code: 'PREP',
          name: 'Prep',
          iconSvg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>'
        };
    }
  }

  /* ==========================================================================
     3. Timeline Breakdown Algorithm (§4)
     ========================================================================== */

  function computeTimelineSegments(day) {
    const H = parseMinutesFromHours(day.hrs);
    const W = (day.watch && day.watch.type === 'video' && day.watch.minutes) ? day.watch.minutes : 0;
    const isTestDay = day.subj === 'test';

    // Official Test Day (5 Dec 2026) special schedule
    if (day.date === TESTDAY_DATE || day.hrs === '—') {
      return {
        totalDisplay: 'Real Exam Schedule (~180m)',
        note: 'Official College Board Bluebook administration timeline',
        segments: [
          { label: 'Check-in', time: '7:45–8:00 (15m)', pct: 8, cls: 'setup' },
          { label: 'Device & Code', time: '8:00–8:15 (15m)', pct: 8, cls: 'setup' },
          { label: 'Reading & Writing', time: '8:15–9:19 (64m)', pct: 36, cls: 'rw' },
          { label: 'Official Break', time: '9:19–9:29 (10m)', pct: 6, cls: 'break' },
          { label: 'Math Modules', time: '9:29–10:39 (70m)', pct: 39, cls: 'math' },
          { label: 'Dismissal', time: '10:40', pct: 3, cls: 'setup' }
        ]
      };
    }

    // Rule 3: For practice TEST days (150 min block)
    if (isTestDay && H >= 120) {
      return {
        totalDisplay: '~154 min real test shape',
        note: 'Runs ~154 min in full Bluebook simulation',
        segments: [
          { label: 'Setup & Settle', time: '0–10m (10 min)', pct: 6.5, cls: 'setup' },
          { label: 'Reading & Writing', time: '10–74m (2 modules, 64 min)', pct: 41.5, cls: 'rw' },
          { label: 'Break', time: '74–84m (10 min)', pct: 6.5, cls: 'break' },
          { label: 'Math', time: '84–154m (2 modules, 70 min)', pct: 45.5, cls: 'math' }
        ]
      };
    }

    // Rule 1: Check for explicit minute splits in `do` text
    // Example: "45min Adv Math (KA Unit 8) + 45min Info & Ideas"
    // or "30min Adv Math error review + 45min Standard English Conventions (10 Qs) + 15min free Desmos practice"
    const splitRegex = /(\d+)\s*min(?:utes)?\s+([^+\.,;]+)/gi;
    const explicitMatches = [];
    let match;
    while ((match = splitRegex.exec(day.do)) !== null) {
      explicitMatches.push({
        minutes: parseInt(match[1], 10),
        taskDesc: match[2].trim()
      });
    }

    if (explicitMatches.length >= 2) {
      const explicitSum = explicitMatches.reduce((acc, m) => acc + m.minutes, 0);
      const totalBlock = W > 0 ? W + explicitSum : explicitSum;
      const segments = [];
      let cursor = 0;

      if (W > 0) {
        segments.push({
          label: `Watch (${W}m)`,
          time: `${cursor}–${cursor + W}m`,
          pct: Math.max(8, Math.round((W / totalBlock) * 100)),
          cls: 'watch'
        });
        cursor += W;
      }

      explicitMatches.forEach((m, idx) => {
        const start = cursor;
        const end = cursor + m.minutes;
        cursor = end;
        segments.push({
          label: `${m.taskDesc} (${m.minutes}m)`,
          time: `${start}–${end}m`,
          pct: Math.max(12, Math.round((m.minutes / totalBlock) * 100)),
          cls: idx % 2 === 0 ? 'do' : 'review'
        });
      });

      return {
        totalDisplay: `${totalBlock} min`,
        segments
      };
    }

    // Rule 2: Generic algorithm
    // Watch = 0..W
    // Do = W..W+D where D = round((H - W) * 0.85, nearest 5), min 10
    // Review & log = remainder to H, min 5
    const remainingH = Math.max(15, H - W);
    let D = Math.round((remainingH * 0.85) / 5) * 5;
    D = Math.max(10, D);
    let R = remainingH - D;
    if (R < 5) {
      R = 5;
      D = Math.max(10, remainingH - R);
    }

    const segments = [];
    let currentMin = 0;

    if (W > 0) {
      segments.push({
        label: `Watch (${W}m)`,
        detail: day.watch.title || 'Video Lesson',
        time: `${currentMin}–${currentMin + W}m`,
        pct: Math.round((W / H) * 100),
        cls: 'watch'
      });
      currentMin += W;
    }

    segments.push({
      label: `Practice (${D}m)`,
      detail: 'Core Problem Sets & Lessons',
      time: `${currentMin}–${currentMin + D}m`,
      pct: Math.round((D / H) * 100),
      cls: 'do'
    });
    currentMin += D;

    segments.push({
      label: `Review (${R}m)`,
      detail: 'Miss classification & summary',
      time: `${currentMin}–${currentMin + R}m`,
      pct: Math.max(6, 100 - (W > 0 ? Math.round((W / H) * 100) : 0) - Math.round((D / H) * 100)),
      cls: 'review'
    });

    return {
      totalDisplay: `${H} min`,
      segments
    };
  }

  /* ==========================================================================
     4. Render Plan Tab & Weeks
     ========================================================================== */

  function renderPlan() {
    if (!elements.weeksListContainer) return;
    elements.weeksListContainer.innerHTML = '';

    const todayStr = '2026-09-10'; // Using current time metadata context
    let activeWeekFound = false;

    WEEKS.forEach(week => {
      const details = document.createElement('details');
      details.className = 'week-accordion';
      details.id = `week-accordion-${week.n}`;

      // Determine if current week based on date range
      const weekDates = week.days.map(d => d.date);
      const isCurrentWeek = weekDates.some(d => d.startsWith('2026-09-14')) && !activeWeekFound;
      if (isCurrentWeek) {
        details.classList.add('is-current');
        details.open = true;
        activeWeekFound = true;
      }

      // Count completed days in this week
      const completedCount = week.days.filter(d => checklistState[d.date]).length;
      const allDone = completedCount === week.days.length;

      // Summary element
      const summary = document.createElement('summary');
      summary.className = 'week-summary';
      summary.innerHTML = `
        <div class="week-summary-left">
          <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
          <div class="week-title-group">
            <span class="week-number">Week ${week.n}</span>
            <span class="week-dates">${week.range}</span>
            <span class="week-phase">${week.phase}</span>
            ${isCurrentWeek ? '<span class="current-pill">Active</span>' : ''}
          </div>
        </div>
        <div class="week-summary-right">
          <span class="week-progress-pill ${allDone ? 'all-done' : ''}" id="week-pill-${week.n}">
            ${completedCount} / ${week.days.length} done
          </span>
        </div>
      `;

      // Day Rows list
      const dayList = document.createElement('div');
      dayList.className = 'day-rows-list';

      week.days.forEach(day => {
        const globalIndex = flatDaysList.findIndex(fd => fd.date === day.date);
        const isDone = !!checklistState[day.date];
        const isTestDay = day.subj === 'test';
        const subjConfig = getSubjectTagConfig(day.subj);

        const row = document.createElement('div');
        row.className = `day-row ${isTestDay ? 'is-test-day' : ''} ${isDone ? 'is-completed' : ''}`;
        row.id = `day-row-${day.date}`;
        row.setAttribute('data-day-index', globalIndex);

        row.innerHTML = `
          <div class="day-check-cell">
            <input type="checkbox" class="custom-checkbox" id="check-${day.date}" ${isDone ? 'checked' : ''} aria-label="Mark completed">
          </div>
          <div class="day-date-cell">
            <span>${formatShortDate(day.date, day.day)}</span>
          </div>
          <div>
            <span class="subject-tag ${day.subj}">
              ${subjConfig.iconSvg}
              <span>${subjConfig.code}</span>
            </span>
          </div>
          <div class="day-title-cell">
            <span class="day-title">${day.title}</span>
            ${day.watch && day.watch.type === 'video' ? `
              <span class="day-video-indicator" title="Includes video lesson">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </span>` : ''}
          </div>
          <div class="day-hours-cell">
            <span>${day.hrs}</span>
          </div>
        `;

        // Checkbox click: toggle completion without opening modal
        const checkInput = row.querySelector('.custom-checkbox');
        checkInput.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleDayComplete(day.date, checkInput.checked);
        });

        // Row click: open Day Detail modal
        row.addEventListener('click', () => {
          openDayModal(globalIndex);
        });

        dayList.appendChild(row);
      });

      details.appendChild(summary);
      details.appendChild(dayList);
      elements.weeksListContainer.appendChild(details);
    });

    // Default: if no current week matched, open Week 1
    if (!activeWeekFound && elements.weeksListContainer.firstElementChild) {
      elements.weeksListContainer.firstElementChild.open = true;
    }
  }

  /* ==========================================================================
     5. Day Detail Modal Functionality — Streamlined Session Flow
     ========================================================================== */

  function openDayModal(index) {
    if (index < 0 || index >= flatDaysList.length) return;
    activeDayIndex = index;
    const day = flatDaysList[index];

    // Header metadata
    elements.modalDayDate.textContent = formatDisplayDate(day.date);
    elements.modalWeekPhase.textContent = `Week ${day.weekNum} · ${day.weekRange}`;

    const subjConfig = getSubjectTagConfig(day.subj);
    elements.modalSubjTag.className = `subject-tag ${day.subj}`;
    elements.modalSubjTag.innerHTML = `${subjConfig.iconSvg}<span>${subjConfig.code}</span>`;
    elements.modalHoursTag.textContent = day.hrs === '—' ? 'EXAM DAY' : `${day.hrs} session`;

    // 1. Session Objective (Derived from day title & curriculum focus — no redundant duplicate tip)
    elements.modalObjectiveText.innerHTML = `
      <div style="font-size:1.05rem; font-weight:700; color:var(--text);">${day.title}</div>
      <div style="font-size:0.82rem; color:var(--muted); margin-top:0.25rem;">Curriculum Target: ${day.weekPhase}</div>
    `;

    // 2. Big Hero Session Timeline Breakdown
    const timelineData = computeTimelineSegments(day);
    elements.modalTotalDurationLabel.textContent = timelineData.totalDisplay;
    elements.modalTimelineBar.innerHTML = '';
    elements.modalTimelineLegend.innerHTML = '';

    timelineData.segments.forEach(seg => {
      const segEl = document.createElement('div');
      segEl.className = `timeline-segment ${seg.cls}`;
      segEl.style.width = `${seg.pct}%`;
      segEl.title = `${seg.label} — ${seg.time}`;
      segEl.innerHTML = `
        <span class="seg-title">${seg.label}</span>
        <span class="seg-time">${seg.time}</span>
      `;
      elements.modalTimelineBar.appendChild(segEl);

      const legEl = document.createElement('div');
      legEl.className = 'timeline-legend-item';
      let dotColor = '#9A9C9F';
      if (seg.cls === 'watch') dotColor = '#FFAE60';
      if (seg.cls === 'do') dotColor = 'var(--orange)';
      if (seg.cls === 'rw' || seg.cls === 'math') dotColor = 'var(--orange)';
      legEl.innerHTML = `<span class="timeline-legend-dot" style="background:${dotColor}"></span>${seg.label} <span style="color:var(--muted-2); font-family:var(--font-mono); font-size:0.7rem;">(${seg.time})</span>`;
      elements.modalTimelineLegend.appendChild(legEl);
    });

    // 3. Chronological Step-by-Step Flow (Where to Start and End)
    elements.modalSessionFlow.innerHTML = '';

    const isTestDay = day.subj === 'test';
    const hasVideo = day.watch && day.watch.type === 'video';
    const hasChannel = day.watch && day.watch.type === 'channel';

    if (day.date === TESTDAY_DATE || day.hrs === '—') {
      // Official Exam Day Card
      const examCard = document.createElement('div');
      examCard.className = 'session-step-card active-step';
      examCard.innerHTML = `
        <div class="session-step-header">
          <div class="session-step-title-group">
            <span class="step-badge">Official Sitting</span>
            <span class="step-title">Test Day Schedule &amp; Execution</span>
          </div>
          <span class="step-time-tag">Real Conditions</span>
        </div>
        <p style="font-size:0.86rem; color:var(--text); line-height:1.5;">
          ${day.do}
        </p>
        <div class="substeps-list" style="margin-top:0.5rem;">
          <div class="substep-item"><span class="substep-num">01</span><span>7:45 AM — Arrive at test center with photo ID and admission ticket.</span></div>
          <div class="substep-item"><span class="substep-num">02</span><span>8:00 AM — Connect device to Wi-Fi, launch Bluebook, enter start code.</span></div>
          <div class="substep-item"><span class="substep-num">03</span><span>8:15 AM — Reading &amp; Writing (Module 1 &amp; Module 2, 64 min total).</span></div>
          <div class="substep-item"><span class="substep-num">04</span><span>9:19 AM — 10-minute scheduled break (snack &amp; water).</span></div>
          <div class="substep-item"><span class="substep-num">05</span><span>9:29 AM — Math (Module 1 &amp; Module 2, 70 min total).</span></div>
          <div class="substep-item"><span class="substep-num">06</span><span>10:40 AM — Test complete. Dismissal.</span></div>
        </div>
      `;
      elements.modalSessionFlow.appendChild(examCard);

    } else if (isTestDay) {
      // Practice Bluebook Test Block
      const testStepCard = document.createElement('div');
      testStepCard.className = 'session-step-card active-step';
      testStepCard.innerHTML = `
        <div class="session-step-header">
          <div class="session-step-title-group">
            <span class="step-badge">Phase 1</span>
            <span class="step-title">Full Bluebook Test Simulation</span>
          </div>
          <span class="step-time-tag">~154 min block</span>
        </div>
        <div class="substeps-list">
          <div class="substep-item"><span class="substep-num">01</span><span>0–10m — Setup quiet testing environment, close tabs, launch Bluebook.</span></div>
          <div class="substep-item"><span class="substep-num">02</span><span>10–74m — Reading &amp; Writing: 54 questions across 2 modules (64 min).</span></div>
          <div class="substep-item"><span class="substep-num">03</span><span>74–84m — 10-minute break away from screen.</span></div>
          <div class="substep-item"><span class="substep-num">04</span><span>84–154m — Math: 44 questions across 2 modules (70 min).</span></div>
          <div class="substep-item"><span class="substep-num">05</span><span>Post-Test — Record your score in the Scores tab immediately.</span></div>
        </div>
      `;
      elements.modalSessionFlow.appendChild(testStepCard);

      if (hasVideo) {
        const videoStepCard = document.createElement('div');
        videoStepCard.className = 'session-step-card';
        videoStepCard.innerHTML = `
          <div class="session-step-header">
            <div class="session-step-title-group">
              <span class="step-badge">Prep Video</span>
              <span class="step-title">${day.watch.title}</span>
            </div>
            <span class="step-time-tag">${day.watch.minutes} min</span>
          </div>
          <div class="compact-video-card">
            <div class="compact-video-left">
              <div class="compact-video-play-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div class="compact-video-info">
                <div class="compact-video-title">${day.watch.title}</div>
                <div class="compact-video-meta">Pratik Vangal · ${day.watch.minutes} min</div>
              </div>
            </div>
            <div class="compact-video-actions">
              <button class="btn btn-sm btn-primary toggle-video-btn" type="button">▷ Watch In App</button>
              <a href="https://www.youtube.com/watch?v=${day.watch.id}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost">YouTube ↗</a>
            </div>
          </div>
          <div class="video-collapsible-wrapper">
            <div class="video-embed-frame">
              <iframe src="https://www.youtube.com/embed/${day.watch.id}?rel=0" title="${day.watch.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        `;
        elements.modalSessionFlow.appendChild(videoStepCard);
      }

    } else {
      // Standard Study Day Flow: Step 1 (Watch/Prep) -> Step 2 (Solve) -> Step 3 (Review & Log)

      // Step 1: Watch & Learn / Prep
      const step1Card = document.createElement('div');
      step1Card.className = 'session-step-card active-step';

      if (hasVideo) {
        step1Card.innerHTML = `
          <div class="session-step-header">
            <div class="session-step-title-group">
              <span class="step-badge">Step 1</span>
              <span class="step-title">Watch Strategy &amp; Concept Lesson</span>
            </div>
            <span class="step-time-tag">0–${day.watch.minutes}m (${day.watch.minutes} min)</span>
          </div>
          <div class="compact-video-card">
            <div class="compact-video-left">
              <div class="compact-video-play-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div class="compact-video-info">
                <div class="compact-video-title">${day.watch.title}</div>
                <div class="compact-video-meta">Pratik Vangal · ${day.watch.minutes} min lesson</div>
              </div>
            </div>
            <div class="compact-video-actions">
              <button class="btn btn-sm btn-primary toggle-video-btn" type="button">▷ Watch Lesson</button>
              <a href="https://www.youtube.com/watch?v=${day.watch.id}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost">YouTube ↗</a>
            </div>
          </div>
          <div class="video-collapsible-wrapper">
            <div class="video-embed-frame">
              <iframe src="https://www.youtube.com/embed/${day.watch.id}?rel=0" title="${day.watch.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        `;
      } else if (hasChannel) {
        step1Card.innerHTML = `
          <div class="session-step-header">
            <div class="session-step-title-group">
              <span class="step-badge">Step 1</span>
              <span class="step-title">Curated Topic Walkthrough</span>
            </div>
            <span class="step-time-tag">Recommended Channel</span>
          </div>
          <div class="compact-video-card">
            <div class="compact-video-left">
              <div class="compact-video-play-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
              <div class="compact-video-info">
                <div class="compact-video-title">${day.watch.label}</div>
                <div class="compact-video-meta">Recommended resource for today's concepts</div>
              </div>
            </div>
            <a href="${day.watch.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
              Open Channel ↗
            </a>
          </div>
        `;
      } else {
        step1Card.innerHTML = `
          <div class="session-step-header">
            <div class="session-step-title-group">
              <span class="step-badge">Step 1</span>
              <span class="step-title">Session Setup &amp; Missed Problem Review</span>
            </div>
            <span class="step-time-tag">Initial 5–10m</span>
          </div>
          <p style="font-size:0.86rem; color:var(--muted); line-height:1.5;">
            No video today. Open your error log and review past misses in this domain to prime your pattern recognition before solving.
          </p>
        `;
      }
      elements.modalSessionFlow.appendChild(step1Card);

      // Step 2: Practice & Solve (Action Tasks)
      const step2Card = document.createElement('div');
      step2Card.className = 'session-step-card';
      const doText = (day.do || '').trim();
      const rawSteps = doText.split(/\s+\+\s+|\.\s+/).map(s => s.trim()).filter(s => s.length > 0);

      let step2ListHtml = '';
      if (rawSteps.length === 0) {
        step2ListHtml = `<div class="substep-item"><span class="substep-num">01</span><span>Independent review, error-log analysis, and rest.</span></div>`;
      } else {
        rawSteps.forEach((step, idx) => {
          const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
          const formatted = step.endsWith('.') ? step : `${step}.`;
          step2ListHtml += `
            <label class="substep-item" style="cursor:pointer;">
              <input type="checkbox" class="custom-checkbox" style="margin-top:0.15rem; flex-shrink:0;">
              <span>${formatted}</span>
            </label>
          `;
        });
      }

      step2Card.innerHTML = `
        <div class="session-step-header">
          <div class="session-step-title-group">
            <span class="step-badge">Step 2</span>
            <span class="step-title">Core Practice Tasks &amp; Problem Sets</span>
          </div>
          <span class="step-time-tag">Primary Workout</span>
        </div>
        <div class="substeps-list">
          ${step2ListHtml}
        </div>
      `;
      elements.modalSessionFlow.appendChild(step2Card);

      // Step 3: Review & Log (Wrap-Up)
      const step3Card = document.createElement('div');
      step3Card.className = 'session-step-card';
      step3Card.innerHTML = `
        <div class="session-step-header">
          <div class="session-step-title-group">
            <span class="step-badge">Step 3</span>
            <span class="step-title">Review, Error Logging &amp; Sign-Off</span>
          </div>
          <span class="step-time-tag">Final 5–10m</span>
        </div>
        <p style="font-size:0.86rem; color:var(--muted); line-height:1.5;">
          Review any misses immediately. Categorize each miss into <strong>Careless slip</strong> (e.g. sign error, missed EXCEPT) vs <strong>Content gap</strong>. Then mark the session complete below.
        </p>
      `;
      elements.modalSessionFlow.appendChild(step3Card);
    }

    // Attach Toggle Video listener if button exists
    const toggleVideoBtn = elements.modalSessionFlow.querySelector('.toggle-video-btn');
    if (toggleVideoBtn) {
      const wrapper = elements.modalSessionFlow.querySelector('.video-collapsible-wrapper');
      toggleVideoBtn.addEventListener('click', () => {
        const isExpanded = wrapper.classList.toggle('is-expanded');
        toggleVideoBtn.textContent = isExpanded ? '✕ Close Video' : '▷ Watch Lesson';
        toggleVideoBtn.classList.toggle('btn-primary', !isExpanded);
        toggleVideoBtn.classList.toggle('btn-ghost', isExpanded);
      });
    }

    // 4. Strategic Pro-Tip (Only if present, styled as callout)
    if (day.tip) {
      elements.modalTipContent.textContent = day.tip;
      elements.modalTipCallout.style.display = 'flex';
    } else {
      elements.modalTipCallout.style.display = 'none';
    }

    // 5. Completion Toggle Synchronization
    const isDone = !!checklistState[day.date];
    elements.modalCheckmark.checked = isDone;
    elements.modalCompletionStatus.textContent = isDone ? 'Completed' : 'Pending';
    elements.modalCompletionStatus.style.color = isDone ? 'var(--orange)' : 'var(--muted-2)';

    // 6. Navigation Controls
    elements.modalPrevDayBtn.disabled = index === 0;
    elements.modalNextDayBtn.disabled = index === flatDaysList.length - 1;
    elements.modalNavDayCounter.textContent = `Day ${index + 1} of ${flatDaysList.length}`;

    // Open Modal
    elements.dayModalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDayModal() {
    elements.dayModalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    // Unload iframe if any so video audio stops immediately
    elements.modalSessionFlow.innerHTML = '';
  }

  function navigateModal(direction) {
    const newIndex = activeDayIndex + direction;
    if (newIndex >= 0 && newIndex < flatDaysList.length) {
      openDayModal(newIndex);
    }
  }

  function toggleDayComplete(dateStr, isChecked) {
    if (isChecked) {
      checklistState[dateStr] = true;
    } else {
      delete checklistState[dateStr];
    }
    saveChecklistData();
    syncChecklistUI(dateStr, isChecked);
  }

  function syncChecklistUI(dateStr, isChecked) {
    // Sync inline row
    const row = document.getElementById(`day-row-${dateStr}`);
    if (row) {
      const checkbox = row.querySelector('.custom-checkbox');
      if (checkbox) checkbox.checked = isChecked;
      if (isChecked) {
        row.classList.add('is-completed');
      } else {
        row.classList.remove('is-completed');
      }
    }

    // Sync modal if open on this day
    if (activeDayIndex >= 0 && flatDaysList[activeDayIndex]?.date === dateStr) {
      elements.modalCheckmark.checked = isChecked;
      elements.modalCompletionStatus.textContent = isChecked ? 'Completed' : 'Pending';
      elements.modalCompletionStatus.style.color = isChecked ? 'var(--orange)' : 'var(--muted-2)';
    }

    // Update week progress counters
    WEEKS.forEach(week => {
      const weekCompleted = week.days.filter(d => checklistState[d.date]).length;
      const pill = document.getElementById(`week-pill-${week.n}`);
      if (pill) {
        pill.textContent = `${weekCompleted} / ${week.days.length} done`;
        if (weekCompleted === week.days.length) {
          pill.classList.add('all-done');
        } else {
          pill.classList.remove('all-done');
        }
      }
    });

    updateOverallProgress();
  }

  /* ==========================================================================
     6. Metrics & Countdown Computations
     ========================================================================== */

  function updateOverallProgress() {
    const totalDays = flatDaysList.length || 65;
    const completedCount = Object.keys(checklistState).filter(d => checklistState[d]).length;
    const percent = ((completedCount / totalDays) * 100).toFixed(1);

    if (elements.metricCompletedCount) {
      elements.metricCompletedCount.textContent = `${completedCount} / ${totalDays}`;
    }
    if (elements.metricCompletedPercent) {
      elements.metricCompletedPercent.textContent = `${percent}% completed`;
    }
    if (elements.progressHeaderStats) {
      elements.progressHeaderStats.textContent = `${completedCount} of ${totalDays} days completed (${percent}%)`;
    }
    if (elements.mainProgressFill) {
      elements.mainProgressFill.style.width = `${percent}%`;
    }
  }

  function updateHeroCountdowns() {
    // Current local reference time: 2026-09-10
    const now = new Date();
    // Normalize to date at midnight for clean day differences
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Checkpoint: 2026-11-09
    const cpDate = new Date(2026, 10, 9); // Month is 0-indexed: 10 = Nov
    const cpDiff = Math.ceil((cpDate - today) / (1000 * 60 * 60 * 24));
    if (elements.metricCheckpointDays) {
      elements.metricCheckpointDays.textContent = cpDiff > 0 ? `${cpDiff} days` : (cpDiff === 0 ? 'Today!' : 'Passed');
    }

    // Sitting: 2026-12-05
    const testDate = new Date(2026, 11, 5); // 11 = Dec
    const testDiff = Math.ceil((testDate - today) / (1000 * 60 * 60 * 24));
    if (elements.metricSittingDays) {
      elements.metricSittingDays.textContent = testDiff > 0 ? `${testDiff} days` : (testDiff === 0 ? 'Today!' : 'Passed');
    }

    // Schedule Phase / Current Week
    const planStart = new Date(2026, 8, 14); // 14 Sep 2026
    const daysUntilStart = Math.ceil((planStart - today) / (1000 * 60 * 60 * 24));

    if (daysUntilStart > 0) {
      if (elements.metricCurrentWeek) elements.metricCurrentWeek.textContent = 'Week 1';
      if (elements.metricWeekRange) elements.metricWeekRange.textContent = `Starts in ${daysUntilStart} days (14 Sep)`;
    } else {
      // Find current active week
      const currentDay = flatDaysList.find(d => {
        const parts = d.date.split('-');
        const dDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return Math.abs(dDate - today) < 1000 * 60 * 60 * 24 * 3;
      });
      if (currentDay) {
        if (elements.metricCurrentWeek) elements.metricCurrentWeek.textContent = `Week ${currentDay.weekNum}`;
        if (elements.metricWeekRange) elements.metricWeekRange.textContent = currentDay.weekRange;
      }
    }
  }

  /* ==========================================================================
     7. Scores Tab: Logging & SVG Chart
     ========================================================================== */

  function renderScores() {
    // Sort scores chronologically
    scoresState.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Update count badges
    if (elements.scoresTabCount) {
      elements.scoresTabCount.textContent = scoresState.length;
    }
    if (elements.scoreHistoryCount) {
      elements.scoreHistoryCount.textContent = `${scoresState.length} ${scoresState.length === 1 ? 'record' : 'records'}`;
    }

    // Render Table
    if (elements.scoreTableBody) {
      elements.scoreTableBody.innerHTML = '';
      scoresState.forEach((score, idx) => {
        const tr = document.createElement('tr');
        const gap = 1500 - score.total;
        const gapText = gap > 0 ? `-${gap} pts` : (gap === 0 ? 'Goal met!' : `+${Math.abs(gap)} pts`);
        const isBaseline = score.date === BASELINE.date && idx === 0;

        tr.innerHTML = `
          <td>${score.date}</td>
          <td><strong>${score.name || 'Practice Test'}</strong></td>
          <td class="total-col">${score.total}</td>
          <td>${score.rw}</td>
          <td>${score.math}</td>
          <td style="color:${gap <= 0 ? 'var(--orange)' : 'var(--muted)'};">${gapText}</td>
          <td>
            ${!isBaseline ? `<button class="delete-score-btn" data-index="${idx}" title="Delete score entry">✕ Delete</button>` : '<span style="color:var(--muted-2); font-size:0.75rem;">Baseline</span>'}
          </td>
        `;

        const delBtn = tr.querySelector('.delete-score-btn');
        if (delBtn) {
          delBtn.addEventListener('click', () => {
            if (confirm(`Delete score record for ${score.name || score.date}?`)) {
              scoresState.splice(idx, 1);
              saveScoresData();
              renderScores();
            }
          });
        }

        elements.scoreTableBody.appendChild(tr);
      });
    }

    // Render SVG Trajectory Chart
    renderTrajectoryChart();
  }

  function renderTrajectoryChart() {
    if (!elements.scoreChartSvg) return;

    const svg = elements.scoreChartSvg;
    const width = 880;
    const height = 260;
    const padding = { top: 30, right: 40, bottom: 40, left: 60 };

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Y Axis Range: 1100 to 1600
    const minY = 1100;
    const maxY = 1600;

    const getY = (val) => {
      return padding.top + chartHeight - ((val - minY) / (maxY - minY)) * chartHeight;
    };

    // Key milestones on timeline (X axis domain)
    // 25 Aug 2026 (Baseline) -> 5 Dec 2026 (Test Day)
    const startDate = new Date(2026, 7, 25).getTime();
    const endDate = new Date(2026, 11, 8).getTime();

    const getX = (dateStr) => {
      const d = new Date(dateStr).getTime();
      const clamped = Math.max(startDate, Math.min(endDate, d));
      return padding.left + ((clamped - startDate) / (endDate - startDate)) * chartWidth;
    };

    let svgHtml = '';

    // Horizontal Grid Lines & Score Labels
    const gridScores = [1200, 1300, 1400, 1500, 1600];
    gridScores.forEach(score => {
      const y = getY(score);
      const isTarget = score === 1500;

      svgHtml += `
        <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" 
              stroke="${isTarget ? 'var(--orange)' : 'var(--border)'}" 
              stroke-width="${isTarget ? '1.5' : '1'}" 
              stroke-dasharray="${isTarget ? '5,5' : 'none'}" />
        <text x="${padding.left - 12}" y="${y + 4}" 
              fill="${isTarget ? 'var(--orange)' : 'var(--muted-2)'}" 
              font-family="var(--font-mono)" font-size="11" text-anchor="end" font-weight="${isTarget ? '700' : '500'}">
          ${score}
        </text>
      `;
    });

    // Milestone vertical lines (Checkpoint 9 Nov & Test Day 5 Dec)
    const checkpointX = getX(CHECKPOINT_DATE);
    const testdayX = getX(TESTDAY_DATE);

    svgHtml += `
      <!-- Checkpoint line -->
      <line x1="${checkpointX}" y1="${padding.top}" x2="${checkpointX}" y2="${height - padding.bottom}" 
            stroke="var(--border)" stroke-dasharray="3,3" />
      <text x="${checkpointX}" y="${padding.top - 10}" 
            fill="var(--muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">
        Checkpoint (Nov 9)
      </text>

      <!-- Test Day line -->
      <line x1="${testdayX}" y1="${padding.top}" x2="${testdayX}" y2="${height - padding.bottom}" 
            stroke="var(--orange-border)" stroke-dasharray="3,3" />
      <text x="${testdayX}" y="${padding.top - 10}" 
            fill="var(--orange)" font-family="var(--font-mono)" font-size="9" text-anchor="middle" font-weight="600">
        Test Day (Dec 5)
      </text>
    `;

    // Target 1500 Line Label on Right
    const targetY = getY(1500);
    svgHtml += `
      <text x="${width - padding.right + 8}" y="${targetY + 4}" 
            fill="var(--orange)" font-family="var(--font-mono)" font-size="10" font-weight="700">
        1500+ Target
      </text>
    `;

    // Build data points
    if (scoresState.length > 0) {
      // Points sorted by date
      const pts = scoresState.map(s => ({
        x: getX(s.date),
        yTotal: getY(s.total),
        yRw: getY(s.rw),
        yMath: getY(s.math),
        data: s
      }));

      // Generate Polyline for Total
      const totalPointsStr = pts.map(p => `${p.x},${p.yTotal}`).join(' ');
      svgHtml += `
        <polyline points="${totalPointsStr}" 
                  fill="none" 
                  stroke="var(--orange)" 
                  stroke-width="2.5" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" />
      `;

      // Interactive circles for Total
      pts.forEach(p => {
        svgHtml += `
          <circle cx="${p.x}" cy="${p.yTotal}" r="5" 
                  fill="#1E2022" 
                  stroke="var(--orange)" 
                  stroke-width="2.5" 
                  class="chart-dot" 
                  data-name="${p.data.name || 'Score'}" 
                  data-date="${p.data.date}" 
                  data-total="${p.data.total}" 
                  data-rw="${p.data.rw}" 
                  data-math="${p.data.math}" 
                  style="cursor: pointer;" />
        `;
      });

      // Bottom X axis labels for recorded dates
      pts.forEach(p => {
        svgHtml += `
          <text x="${p.x}" y="${height - padding.bottom + 18}" 
                fill="var(--muted)" font-family="var(--font-mono)" font-size="10" text-anchor="middle">
            ${p.data.date.slice(5)}
          </text>
        `;
      });
    }

    svg.innerHTML = svgHtml;

    // Attach Hover Tooltip interactions
    const dots = svg.querySelectorAll('.chart-dot');
    dots.forEach(dot => {
      dot.addEventListener('mouseenter', (e) => {
        const name = dot.getAttribute('data-name');
        const date = dot.getAttribute('data-date');
        const total = dot.getAttribute('data-total');
        const rw = dot.getAttribute('data-rw');
        const math = dot.getAttribute('data-math');
        const gap = 1500 - parseInt(total, 10);
        const gapText = gap <= 0 ? 'Goal Achieved!' : `${gap} pts to 1500`;

        elements.chartTooltip.innerHTML = `
          <div style="font-weight:700; color:var(--text); margin-bottom:0.2rem;">${name}</div>
          <div style="color:var(--muted); font-size:0.7rem; margin-bottom:0.35rem;">${date}</div>
          <div style="color:var(--orange); font-weight:700; font-size:0.9rem;">Total: ${total}</div>
          <div style="color:var(--muted); font-size:0.72rem;">RW: ${rw} · Math: ${math}</div>
          <div style="color:var(--muted-2); font-size:0.7rem; margin-top:0.2rem;">${gapText}</div>
        `;

        const rect = svg.getBoundingClientRect();
        const cx = parseFloat(dot.getAttribute('cx'));
        const cy = parseFloat(dot.getAttribute('cy'));

        // Map svg coords to client percentage
        const leftPct = (cx / width) * 100;
        const topPct = (cy / height) * 100;

        elements.chartTooltip.style.left = `${leftPct}%`;
        elements.chartTooltip.style.top = `${topPct}%`;
        elements.chartTooltip.style.display = 'block';
      });

      dot.addEventListener('mouseleave', () => {
        elements.chartTooltip.style.display = 'none';
      });
    });
  }

  /* ==========================================================================
     8. Render Static / Reference Tabs
     ========================================================================== */

  function renderToolkit() {
    if (!elements.toolkitGrid || !TOOLKIT_DATA) return;
    elements.toolkitGrid.innerHTML = '';

    TOOLKIT_DATA.techniques.forEach(tech => {
      const card = document.createElement('div');
      card.className = 'toolkit-card';
      card.innerHTML = `
        <div class="toolkit-card-header">
          <h3 class="toolkit-card-title">${tech.title}</h3>
          <span class="toolkit-card-subtitle">${tech.subtitle}</span>
        </div>
        <p class="toolkit-card-desc">${tech.desc}</p>
        <div class="toolkit-example-box">
          <span style="color:var(--orange); font-weight:600;">SAT Example:</span> ${tech.example}
        </div>
        <div class="toolkit-tags">
          ${tech.tags.map(t => `<span class="toolkit-tag">${t}</span>`).join('')}
        </div>
      `;
      elements.toolkitGrid.appendChild(card);
    });

    if (elements.formulasGrid && TOOLKIT_DATA.formulas) {
      elements.formulasGrid.innerHTML = '';
      TOOLKIT_DATA.formulas.forEach(form => {
        const card = document.createElement('div');
        card.className = 'formula-card';
        card.innerHTML = `
          <div class="formula-name">${form.name}</div>
          <div class="formula-code">${form.formula}</div>
          <div class="formula-note">${form.note}</div>
        `;
        elements.formulasGrid.appendChild(card);
      });
    }
  }

  function renderVideos() {
    if (!VIDEO_LIBRARY_DATA) return;

    // Start Here Videos
    if (elements.startHereGrid && VIDEO_LIBRARY_DATA.startHere) {
      elements.startHereGrid.innerHTML = '';
      VIDEO_LIBRARY_DATA.startHere.forEach(vid => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
          <div class="video-card-thumb">
            <iframe src="https://www.youtube.com/embed/${vid.id}?rel=0" 
                    title="${vid.title}" 
                    loading="lazy" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
          </div>
          <div class="video-card-body">
            <h3 class="video-card-title">${vid.title}</h3>
            <div class="video-card-meta">
              <span>${vid.creator}</span>
              <span style="color:var(--orange); font-weight:600;">${vid.duration}</span>
            </div>
            <p class="video-card-notes">${vid.notes}</p>
          </div>
        `;
        elements.startHereGrid.appendChild(card);
      });
    }

    // Channel Cards
    if (elements.channelsGrid && VIDEO_LIBRARY_DATA.channels) {
      elements.channelsGrid.innerHTML = '';
      VIDEO_LIBRARY_DATA.channels.forEach(ch => {
        const card = document.createElement('div');
        card.className = 'channel-card';
        card.innerHTML = `
          <div class="channel-card-top">
            <div>
              <h3 class="channel-name">${ch.name}</h3>
              <span class="channel-handle">${ch.handle}</span>
            </div>
          </div>
          <span class="channel-focus">${ch.focus}</span>
          <p class="channel-desc">${ch.desc}</p>
          <a href="${ch.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-ghost">
            Open Channel ↗
          </a>
        `;
        elements.channelsGrid.appendChild(card);
      });
    }
  }

  function renderTips() {
    if (!elements.tipsListContainer || !TIPS_DATA) return;
    elements.tipsListContainer.innerHTML = '';

    TIPS_DATA.forEach((tipCategory, idx) => {
      const details = document.createElement('details');
      details.className = 'tip-accordion';
      if (idx === 0) details.open = true;

      const summary = document.createElement('summary');
      summary.className = 'tip-summary';
      summary.innerHTML = `
        <span>${tipCategory.title}</span>
        <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      `;

      const content = document.createElement('div');
      content.className = 'tip-content';

      tipCategory.items.forEach(text => {
        const item = document.createElement('div');
        item.className = 'tip-item';
        item.innerHTML = `
          <span class="tip-bullet">▪</span>
          <span>${text}</span>
        `;
        content.appendChild(item);
      });

      details.appendChild(summary);
      details.appendChild(content);
      elements.tipsListContainer.appendChild(details);
    });
  }

  /* ==========================================================================
     9. Event Listeners & Initialization
     ========================================================================== */

  function setupEventListeners() {
    // Tab Switching
    elements.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        elements.tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        elements.tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const activePanel = document.getElementById(`panel-${targetTab}`);
        if (activePanel) {
          activePanel.classList.add('active');
        }

        // Trigger redraw of chart when switching to scores
        if (targetTab === 'scores') {
          setTimeout(renderTrajectoryChart, 60);
        }
      });
    });

    // Expand / Collapse all weeks
    if (elements.expandAllWeeksBtn) {
      elements.expandAllWeeksBtn.addEventListener('click', () => {
        document.querySelectorAll('.week-accordion').forEach(w => w.open = true);
      });
    }

    if (elements.collapseAllWeeksBtn) {
      elements.collapseAllWeeksBtn.addEventListener('click', () => {
        document.querySelectorAll('.week-accordion').forEach(w => w.open = false);
      });
    }

    // Modal Events
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', closeDayModal);
    }

    if (elements.dayModalBackdrop) {
      elements.dayModalBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.dayModalBackdrop) {
          closeDayModal();
        }
      });
    }

    if (elements.modalPrevDayBtn) {
      elements.modalPrevDayBtn.addEventListener('click', () => navigateModal(-1));
    }

    if (elements.modalNextDayBtn) {
      elements.modalNextDayBtn.addEventListener('click', () => navigateModal(1));
    }

    if (elements.modalCheckmark) {
      elements.modalCheckmark.addEventListener('change', (e) => {
        if (activeDayIndex >= 0 && flatDaysList[activeDayIndex]) {
          toggleDayComplete(flatDaysList[activeDayIndex].date, e.target.checked);
        }
      });
    }

    // Keyboard Shortcuts: Escape & Arrow Navigation
    window.addEventListener('keydown', (e) => {
      if (!elements.dayModalBackdrop.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        closeDayModal();
      } else if (e.key === 'ArrowLeft') {
        navigateModal(-1);
      } else if (e.key === 'ArrowRight') {
        navigateModal(1);
      }
    });

    // Score Entry Form Calculations & Submission
    const updatePreviewTotal = () => {
      const rw = parseInt(elements.scoreRw.value, 10) || 0;
      const math = parseInt(elements.scoreMath.value, 10) || 0;
      if (rw > 0 && math > 0) {
        elements.previewTotalScore.textContent = rw + math;
      } else {
        elements.previewTotalScore.textContent = '—';
      }
    };

    if (elements.scoreRw && elements.scoreMath) {
      elements.scoreRw.addEventListener('input', updatePreviewTotal);
      elements.scoreMath.addEventListener('input', updatePreviewTotal);
    }

    if (elements.scoreEntryForm) {
      elements.scoreEntryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = elements.scoreDate.value;
        const name = elements.scoreTestName.value;
        const rw = parseInt(elements.scoreRw.value, 10);
        const math = parseInt(elements.scoreMath.value, 10);
        const total = rw + math;

        if (!date || isNaN(rw) || isNaN(math)) {
          alert('Please fill out all required fields with valid numbers.');
          return;
        }

        scoresState.push({ date, total, rw, math, name });
        saveScoresData();
        renderScores();

        // Reset form
        elements.scoreRw.value = '';
        elements.scoreMath.value = '';
        elements.previewTotalScore.textContent = '—';
        alert(`Recorded ${name} (${total}) successfully!`);
      });
    }

    // Set default date picker to today
    if (elements.scoreDate) {
      const todayISO = new Date().toISOString().split('T')[0];
      elements.scoreDate.value = todayISO;
    }

    // Window resize handler for chart
    window.addEventListener('resize', () => {
      renderTrajectoryChart();
    });
  }

  /* ==========================================================================
     Application Bootstrap
     ========================================================================== */

  function handleDeepLink() {
    const hash = window.location.hash;
    if (!hash) return;
    if (hash === '#scores' || hash === '#toolkit' || hash === '#videos' || hash === '#tips') {
      const tabName = hash.replace('#', '');
      const targetBtn = document.getElementById(`tabBtn-${tabName}`);
      if (targetBtn) targetBtn.click();
    } else if (hash.startsWith('#day-')) {
      const dateStr = hash.replace('#day-', '');
      const dayIndex = flatDaysList.findIndex(d => d.date === dateStr);
      if (dayIndex !== -1) {
        openDayModal(dayIndex);
      }
    } else if (hash === '#modal') {
      openDayModal(0);
    }
  }

  function init() {
    loadStorageData();
    buildFlatDays();
    renderPlan();
    renderScores();
    renderToolkit();
    renderVideos();
    renderTips();
    updateOverallProgress();
    updateHeroCountdowns();
    setupEventListeners();
    handleDeepLink();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

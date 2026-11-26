/**
 * SmartSave: Intelligent Campus Energy Management System
 * Clean, Human-Crafted Prototype Engine
 */

// Application State
const SmartSave = {
    settings: {
        costPerKwh: 8.50,
        soundEnabled: true,
        countdownDuration: 30, // seconds
        currentFilter: 'all'
    },

    metrics: {
        totalSavedKwh: 58.4,
        moneySaved: 496.40,
        shutdownCount: 26
    },

    rooms: [
        // --- 4 CLASSROOMS ---
        {
            id: 'cr-101',
            name: 'Classroom 101',
            category: 'classroom',
            location: 'Academic Block A • 1st Floor',
            occupied: true,
            occupants: 24,
            devices: {
                light: { name: 'Lights', state: true, watts: 160 },
                fan: { name: 'Fans', state: true, watts: 140 }
            },
            inactivitySeconds: 0,
            countdown: null,
            manualOverride: false,
            aeiou: 'Classroom: Teachers and class representatives ensure switches are OFF when class concludes.'
        },
        {
            id: 'cr-102',
            name: 'Classroom 102',
            category: 'classroom',
            location: 'Academic Block A • 1st Floor',
            occupied: false,
            occupants: 0,
            devices: {
                light: { name: 'Lights', state: false, watts: 160 },
                fan: { name: 'Fans', state: false, watts: 140 }
            },
            inactivitySeconds: 1800,
            countdown: null,
            manualOverride: false,
            aeiou: 'Classroom: Vacant room safely in eco-standby with zero power draw.'
        },
        {
            id: 'cr-103',
            name: 'Classroom 103 (Seminar Hall)',
            category: 'classroom',
            location: 'Academic Block B • Ground Floor',
            occupied: false,
            occupants: 0,
            devices: {
                light: { name: 'Stage & Batten Lights', state: true, watts: 180 },
                fan: { name: 'Ceiling Fans', state: true, watts: 140 }
            },
            inactivitySeconds: 45,
            countdown: 15, // Active countdown in progress!
            manualOverride: false,
            aeiou: 'Seminar Hall: Presentation concluded; speakers left without turning off fans and ceiling lights.'
        },
        {
            id: 'cr-104',
            name: 'Classroom 104 (Tutorial Hall)',
            category: 'classroom',
            location: 'Academic Block B • 2nd Floor',
            occupied: true,
            occupants: 12,
            devices: {
                light: { name: 'Lights', state: true, watts: 120 },
                fan: { name: 'Fans', state: true, watts: 75 }
            },
            inactivitySeconds: 0,
            countdown: null,
            manualOverride: false,
            aeiou: 'Tutorial Hall: Students actively engaged in group study; continuous presence registered.'
        },

        // --- 4 HOSTEL ROOMS & STUDY AREAS ---
        {
            id: 'hr-201',
            name: 'Hostel Room 201',
            category: 'hostel',
            location: 'Boys Hostel Block B • Room 201',
            occupied: false,
            occupants: 0,
            devices: {
                light: { name: 'Lights', state: true, watts: 80 },
                fan: { name: 'Ceiling Fan', state: true, watts: 75 }
            },
            inactivitySeconds: 42,
            countdown: 18, // Active countdown in progress!
            manualOverride: false,
            aeiou: 'Hostel Room: Student rushed out to morning lecture at 8:05 AM, leaving lights & fan ON.'
        },
        {
            id: 'hr-202',
            name: 'Hostel Room 202',
            category: 'hostel',
            location: 'Boys Hostel Block B • Room 202',
            occupied: true,
            occupants: 2,
            devices: {
                light: { name: 'Lights', state: true, watts: 80 },
                fan: { name: 'Ceiling Fan', state: true, watts: 75 }
            },
            inactivitySeconds: 0,
            countdown: null,
            manualOverride: false,
            aeiou: 'Hostel Room: Residents studying at study desks; occupancy verified.'
        },
        {
            id: 'hr-203',
            name: 'Hostel Room 203',
            category: 'hostel',
            location: 'Boys Hostel Block B • Room 203',
            occupied: false,
            occupants: 0,
            devices: {
                light: { name: 'Lights', state: false, watts: 80 },
                fan: { name: 'Ceiling Fan', state: false, watts: 75 }
            },
            inactivitySeconds: 2400,
            countdown: null,
            manualOverride: false,
            aeiou: 'Hostel Room: Resident consciously turned off appliances before leaving for the cafeteria.'
        },
        {
            id: 'hr-study',
            name: 'Hostel Study Room',
            category: 'hostel',
            location: 'Hostel Common Wing • Ground Floor',
            occupied: false,
            occupants: 0,
            devices: {
                light: { name: 'Overhead Lights', state: true, watts: 200 },
                fan: { name: 'High-Volume Fans', state: true, watts: 180 }
            },
            inactivitySeconds: 78,
            countdown: 12, // Active countdown in progress!
            manualOverride: false,
            aeiou: 'Study Room: Late-night study session dispersed; fans and lights left running unattended.'
        }
    ]
};

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAmbientBackground();
    initAudio();
    initCategoryFilters();
    renderRooms();
    renderMetrics();
    initChart();
    initHelpAndFAQ();
    startSimulationTimer();
});

// -----------------------------------------------------------------------------
// 1. Theme Toggle (Light Architectural Default / Charcoal Dark)
// -----------------------------------------------------------------------------
function initTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('smartsave_theme_v2') || 'light';

    setTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
            updateChartTheme();
            showToast(`Switched to ${next} theme`);
        });
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('smartsave_theme_v2', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// -----------------------------------------------------------------------------
// 2. Clean Surface Setup (No distracting floating orbs/particles)
// -----------------------------------------------------------------------------
function initAmbientBackground() {
    // Intentionally kept clean for an authentic, distraction-free campus UI
}

// -----------------------------------------------------------------------------
// 3. Web Audio Synthesizer (Relay Clicks & Chimes)
// -----------------------------------------------------------------------------
let audioCtx = null;
function initAudio() {
    const audioBtn = document.getElementById('audioBtn');
    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            SmartSave.settings.soundEnabled = !SmartSave.settings.soundEnabled;
            audioBtn.innerHTML = SmartSave.settings.soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
            showToast(`Audio ${SmartSave.settings.soundEnabled ? 'Enabled' : 'Muted'}`);
        });
    }
}

function playSound(type) {
    if (!SmartSave.settings.soundEnabled) return;
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const ctx = audioCtx;
        const now = ctx.currentTime;

        if (type === 'click') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.03);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.03);
        } else if (type === 'relay') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(140, now);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === 'chime') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, now);
            osc.frequency.setValueAtTime(880.00, now + 0.08);
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.35);
        }
    } catch (e) {}
}

// -----------------------------------------------------------------------------
// 4. Room Category Filtering (All / Classrooms / Hostels)
// -----------------------------------------------------------------------------
function initCategoryFilters() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            SmartSave.settings.currentFilter = tab.getAttribute('data-filter');
            playSound('click');
            renderRooms();
        });
    });
}

// -----------------------------------------------------------------------------
// 5. Render Live Room Cards
// -----------------------------------------------------------------------------
function renderRooms() {
    const container = document.getElementById('roomsGridContainer');
    if (!container) return;

    let filtered = SmartSave.rooms;
    if (SmartSave.settings.currentFilter === 'classroom') {
        filtered = filtered.filter(r => r.category === 'classroom');
    } else if (SmartSave.settings.currentFilter === 'hostel') {
        filtered = filtered.filter(r => r.category === 'hostel');
    }

    container.innerHTML = filtered.map(room => {
        const hasDevicesOn = room.devices.light.state || room.devices.fan.state;
        const isWasting = !room.occupied && hasDevicesOn && !room.manualOverride;
        const isEcoOff = !room.occupied && !hasDevicesOn;

        let statusClass = 'is-occupied';
        let badgeHtml = `<span class="status-badge occupied"><i class="fas fa-user-check"></i> Occupied (${room.occupants})</span>`;

        if (isWasting) {
            statusClass = 'is-wasting';
            badgeHtml = `<span class="status-badge wasting"><i class="fas fa-exclamation-triangle"></i> Wasting Power</span>`;
        } else if (isEcoOff) {
            statusClass = 'is-empty-off';
            badgeHtml = `<span class="status-badge empty-off"><i class="fas fa-leaf"></i> Empty (Standby)</span>`;
        }

        let totalWatts = 0;
        if (room.devices.light.state) totalWatts += room.devices.light.watts;
        if (room.devices.fan.state) totalWatts += room.devices.fan.watts;

        return `
            <div class="room-card ${statusClass}" id="card-${room.id}">
                <div class="room-card-head">
                    <div>
                        <div class="room-type-tag">${room.location}</div>
                        <h3 class="room-card-title">${room.name}</h3>
                    </div>
                    ${badgeHtml}
                </div>

                <div class="aeiou-note-pill">
                    <i class="fas fa-clipboard-list" style="color: var(--accent-blue);"></i>
                    <span><strong>Field Note:</strong> ${room.aeiou}</span>
                </div>

                ${isWasting ? `
                    <div class="countdown-box">
                        <div class="countdown-label">
                            <i class="fas fa-stopwatch"></i>
                            <span>Auto-Shutdown In:</span>
                        </div>
                        <div class="countdown-number" id="countdown-${room.id}">
                            ${room.countdown !== null ? room.countdown + 's' : '0s'}
                        </div>
                    </div>
                ` : ''}

                <!-- Manual Tactile Switches -->
                <div class="switches-container">
                    <div class="switch-box ${room.devices.light.state ? 'active' : ''}">
                        <div class="switch-meta">
                            <i class="fas fa-lightbulb"></i>
                            <span>${room.devices.light.name} (${room.devices.light.watts}W)</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${room.devices.light.state ? 'checked' : ''} onchange="toggleDevice('${room.id}', 'light')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div class="switch-box ${room.devices.fan.state ? 'active' : ''}">
                        <div class="switch-meta">
                            <i class="fas fa-fan"></i>
                            <span>${room.devices.fan.name} (${room.devices.fan.watts}W)</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" ${room.devices.fan.state ? 'checked' : ''} onchange="toggleDevice('${room.id}', 'fan')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div style="font-size: 0.78rem; color: var(--text-dim); margin-bottom: 12px; display: flex; justify-content: space-between;">
                    <span>Load: <strong style="color: ${totalWatts > 0 ? 'var(--accent-blue)' : 'var(--text-muted)'}">${totalWatts} W</strong></span>
                    <span>${room.manualOverride ? '<strong style="color: var(--accent-amber)">Manual Override</strong>' : 'Auto Sensor Mode'}</span>
                </div>

                <!-- Simulation Action Buttons -->
                <div class="room-card-actions">
                    ${room.occupied ? `
                        <button class="btn-room-action" onclick="simulateStudentLeaves('${room.id}')">
                            <i class="fas fa-door-open"></i> Student Leaves
                        </button>
                    ` : `
                        <button class="btn-room-action" onclick="simulateStudentEnters('${room.id}')">
                            <i class="fas fa-user-plus"></i> Student Enters
                        </button>
                    `}
                    <button class="btn-room-action" onclick="toggleManualOverride('${room.id}')" title="Temporarily lock switches">
                        <i class="fas ${room.manualOverride ? 'fa-lock-open' : 'fa-lock'}"></i>
                        ${room.manualOverride ? 'Unlock' : 'Override'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// -----------------------------------------------------------------------------
// 6. User Controls (Switches, Overrides, Scenarios)
// -----------------------------------------------------------------------------
function toggleDevice(roomId, deviceKey) {
    const room = SmartSave.rooms.find(r => r.id === roomId);
    if (!room) return;

    room.devices[deviceKey].state = !room.devices[deviceKey].state;
    playSound('relay');
    renderRooms();
    renderMetrics();
    showToast(`${room.name}: ${room.devices[deviceKey].name} turned ${room.devices[deviceKey].state ? 'ON' : 'OFF'}`);
}

function toggleManualOverride(roomId) {
    const room = SmartSave.rooms.find(r => r.id === roomId);
    if (!room) return;

    room.manualOverride = !room.manualOverride;
    if (room.manualOverride) {
        room.countdown = null;
        showToast(`${room.name}: Manual Override enabled (switches locked)`);
    } else {
        showToast(`${room.name}: Manual Override disabled (sensors active)`);
    }
    playSound('click');
    renderRooms();
}

function simulateStudentLeaves(roomId) {
    const room = SmartSave.rooms.find(r => r.id === roomId);
    if (!room) return;

    room.occupied = false;
    room.occupants = 0;
    room.inactivitySeconds = 5;
    room.countdown = SmartSave.settings.countdownDuration;
    playSound('click');
    renderRooms();
    renderMetrics();
    showToast(`${room.name}: Student departed. Inactivity countdown initiated (${room.countdown}s).`);
}

function simulateStudentEnters(roomId) {
    const room = SmartSave.rooms.find(r => r.id === roomId);
    if (!room) return;

    room.occupied = true;
    room.occupants = room.occupants || (room.category === 'classroom' ? 20 : 2);
    room.inactivitySeconds = 0;
    room.countdown = null;

    room.devices.light.state = true;
    room.devices.fan.state = true;

    playSound('chime');
    renderRooms();
    renderMetrics();
    showToast(`${room.name}: Occupancy detected. Lights & fans restored automatically.`);
}

// -----------------------------------------------------------------------------
// 7. One-Click Demo Mode Buttons
// -----------------------------------------------------------------------------
function triggerDemoStep1() {
    simulateStudentLeaves('hr-201');
    showToast('Demo Step 1: Student left Hostel Room 201 with lights and fan running.');
}

function triggerDemoStep2() {
    const room = SmartSave.rooms.find(r => r.id === 'hr-201');
    if (!room) return;
    room.occupied = false;
    room.countdown = 0;
    executeAutoShutdown(room);
    renderRooms();
    renderMetrics();
}

function triggerDemoStep3() {
    simulateStudentEnters('hr-201');
    showToast('Demo Step 3: Student returned to Hostel Room 201. Lights & fan restored!');
}

function resetEntireDemo() {
    SmartSave.rooms[0].occupied = true;
    SmartSave.rooms[0].devices.light.state = true;
    SmartSave.rooms[0].devices.fan.state = true;

    SmartSave.rooms[1].occupied = false;
    SmartSave.rooms[1].devices.light.state = false;
    SmartSave.rooms[1].devices.fan.state = false;

    SmartSave.rooms[2].occupied = false;
    SmartSave.rooms[2].devices.light.state = true;
    SmartSave.rooms[2].devices.fan.state = true;
    SmartSave.rooms[2].countdown = 15;

    SmartSave.rooms[3].occupied = true;
    SmartSave.rooms[3].devices.light.state = true;
    SmartSave.rooms[3].devices.fan.state = true;

    SmartSave.rooms[4].occupied = false;
    SmartSave.rooms[4].devices.light.state = true;
    SmartSave.rooms[4].devices.fan.state = true;
    SmartSave.rooms[4].countdown = 18;

    SmartSave.rooms[5].occupied = true;
    SmartSave.rooms[5].devices.light.state = true;
    SmartSave.rooms[5].devices.fan.state = true;

    SmartSave.rooms[6].occupied = false;
    SmartSave.rooms[6].devices.light.state = false;
    SmartSave.rooms[6].devices.fan.state = false;

    SmartSave.rooms[7].occupied = false;
    SmartSave.rooms[7].devices.light.state = true;
    SmartSave.rooms[7].devices.fan.state = true;
    SmartSave.rooms[7].countdown = 12;

    renderRooms();
    renderMetrics();
    playSound('chime');
    showToast('All 8 rooms reset to initial demo state.');
}

// -----------------------------------------------------------------------------
// 8. Simulation Clock (Every 1 Second)
// -----------------------------------------------------------------------------
function startSimulationTimer() {
    setInterval(() => {
        SmartSave.rooms.forEach(room => {
            if (!room.occupied) {
                const hasDevicesOn = room.devices.light.state || room.devices.fan.state;

                if (hasDevicesOn && !room.manualOverride) {
                    if (room.countdown === null) {
                        room.countdown = SmartSave.settings.countdownDuration;
                    } else if (room.countdown > 0) {
                        room.countdown -= 1;
                        const numEl = document.getElementById(`countdown-${room.id}`);
                        if (numEl) numEl.textContent = room.countdown + 's';
                    }

                    if (room.countdown === 0) {
                        executeAutoShutdown(room);
                        renderRooms();
                        renderMetrics();
                    }
                } else if (!hasDevicesOn) {
                    SmartSave.metrics.totalSavedKwh += 0.00006;
                    SmartSave.metrics.moneySaved = SmartSave.metrics.totalSavedKwh * SmartSave.settings.costPerKwh;
                }
            }
        });
        renderMetrics();
    }, 1000);
}

function executeAutoShutdown(room) {
    room.devices.light.state = false;
    room.devices.fan.state = false;
    room.countdown = null;
    SmartSave.metrics.shutdownCount += 1;
    SmartSave.metrics.totalSavedKwh += 0.16;
    SmartSave.metrics.moneySaved = SmartSave.metrics.totalSavedKwh * SmartSave.settings.costPerKwh;

    playSound('relay');
    showToast(`⚡ Auto-Shutdown: Switched OFF lights & fan in ${room.name} to prevent electricity wastage!`);
}

// -----------------------------------------------------------------------------
// 9. Render Top Metrics
// -----------------------------------------------------------------------------
function renderMetrics() {
    const elKwh = document.getElementById('metricSavedKwh');
    const elMoney = document.getElementById('metricMoneySaved');
    const elRooms = document.getElementById('metricRoomsCount');
    const elWasting = document.getElementById('metricWastingCount');

    if (elKwh) elKwh.textContent = SmartSave.metrics.totalSavedKwh.toFixed(1) + ' kWh';
    if (elMoney) elMoney.textContent = '₹' + SmartSave.metrics.moneySaved.toFixed(0);

    const occupiedCount = SmartSave.rooms.filter(r => r.occupied).length;
    if (elRooms) elRooms.textContent = `${occupiedCount} Occupied / ${SmartSave.rooms.length - occupiedCount} Empty`;

    const wastingCount = SmartSave.rooms.filter(r => !r.occupied && (r.devices.light.state || r.devices.fan.state) && !r.manualOverride).length;
    if (elWasting) elWasting.textContent = wastingCount > 0 ? `${wastingCount} Room(s)` : 'Zero Waste';
}

// -----------------------------------------------------------------------------
// 10. Simple Chart.js Comparison Graph
// -----------------------------------------------------------------------------
let savingsChartInstance = null;

function getChartThemeTokens() {
    const isDark = (document.documentElement.getAttribute('data-theme') || 'light') === 'dark';
    return {
        smartColor: isDark ? '#34a88e' : '#0f5c4d',
        smartFill: isDark ? 'rgba(52, 168, 142, 0.14)' : 'rgba(15, 92, 77, 0.12)',
        wasteColor: isDark ? '#ea7b3c' : '#c2410c',
        wasteFill: isDark ? 'rgba(234, 123, 60, 0.08)' : 'rgba(194, 65, 12, 0.07)',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(27, 31, 28, 0.07)',
        tickColor: isDark ? '#a6aca7' : '#515852',
        legendColor: isDark ? '#ededeb' : '#1b1f1c'
    };
}

function initChart() {
    const ctx = document.getElementById('savingsChart');
    if (!ctx || typeof Chart === 'undefined') return;
    const t = getChartThemeTokens();

    savingsChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM', '12 AM'],
            datasets: [
                {
                    label: 'Traditional Campus (Lights & fans left running in empty rooms)',
                    data: [16.5, 22.8, 25.4, 23.0, 21.2, 32.5, 36.0, 29.8, 24.2],
                    borderColor: t.wasteColor,
                    backgroundColor: t.wasteFill,
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: true,
                    tension: 0.35
                },
                {
                    label: 'SmartSave System (Automatically cuts off empty rooms)',
                    data: [12.2, 14.5, 16.0, 15.1, 13.8, 17.5, 19.2, 13.4, 5.2],
                    borderColor: t.smartColor,
                    backgroundColor: t.smartFill,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.35
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: t.legendColor, font: { family: "'Inter', sans-serif" } }
                }
            },
            scales: {
                x: { grid: { color: t.gridColor }, ticks: { color: t.tickColor } },
                y: { grid: { color: t.gridColor }, ticks: { color: t.tickColor } }
            }
        }
    });
}

function updateChartTheme() {
    if (!savingsChartInstance) return;
    const t = getChartThemeTokens();
    savingsChartInstance.data.datasets[0].borderColor = t.wasteColor;
    savingsChartInstance.data.datasets[0].backgroundColor = t.wasteFill;
    savingsChartInstance.data.datasets[1].borderColor = t.smartColor;
    savingsChartInstance.data.datasets[1].backgroundColor = t.smartFill;
    savingsChartInstance.options.plugins.legend.labels.color = t.legendColor;
    savingsChartInstance.options.scales.x.grid.color = t.gridColor;
    savingsChartInstance.options.scales.x.ticks.color = t.tickColor;
    savingsChartInstance.options.scales.y.grid.color = t.gridColor;
    savingsChartInstance.options.scales.y.ticks.color = t.tickColor;
    savingsChartInstance.update();
}

// -----------------------------------------------------------------------------
// 11. Simple Toast Notifications
// -----------------------------------------------------------------------------
function showToast(msg) {
    const existing = document.querySelector('.simple-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'simple-toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-blue);"></i> <span>${msg}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

// -----------------------------------------------------------------------------
// 12. Help, FAQ & User Question Answering
// -----------------------------------------------------------------------------
function initHelpAndFAQ() {
    // 12a. Header Help Button Smooth Scroll
    const helpBtn = document.getElementById('helpBtn');
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            const section = document.getElementById('help-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                playSound('click');
            }
        });
    }

    // 12b. FAQ Accordion Click Toggles
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            if (!item) return;
            const isOpen = item.classList.contains('open');

            // Close other open FAQ items for a clean accordion effect
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                if (openItem !== item) openItem.classList.remove('open');
            });

            // Toggle current
            item.classList.toggle('open', !isOpen);
            playSound('click');
        });
    });

    // 12c. Quick Ask Topic Pills
    const quickPills = document.querySelectorAll('.btn-quick-ask');
    const input = document.getElementById('userQuestionInput');
    quickPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const q = pill.getAttribute('data-q') || pill.textContent;
            if (input) input.value = q;
            handleUserQuestion(q);
        });
    });

    // 12d. Ask Input and Submit Button
    const askBtn = document.getElementById('btnAskSubmit');
    if (askBtn && input) {
        askBtn.addEventListener('click', () => {
            const q = input.value.trim();
            if (q) {
                handleUserQuestion(q);
            } else {
                input.focus();
                showToast('Please type a question to ask SmartSave.');
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const q = input.value.trim();
                if (q) {
                    handleUserQuestion(q);
                }
            }
        });
    }

    // 12e. Feedback / Suggestion Button
    const feedbackBtn = document.getElementById('btnSendFeedback');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            playSound('chime');
            showToast('Thank you! Your suggestion has been recorded for the campus energy management team.');
        });
    }
}

// Intelligent, natural response generator for campus questions
function handleUserQuestion(query) {
    const q = query.toLowerCase();
    const box = document.getElementById('askResponseBox');
    const textEl = document.getElementById('askResponseText');
    if (!box || !textEl) return;

    playSound('chime');

    let answer = "";

    if (q.includes('sleep') || q.includes('nap') || q.includes('rest') || q.includes('quiet') || q.includes('read') || q.includes('study quietly')) {
        answer = "If you are sleeping or studying quietly without moving, simply switch ON the <strong>Manual Override</strong> on your room card. This temporarily pauses the occupancy sensor shutdown and keeps your fans and lights continuously on.";
    } else if (q.includes('countdown') || q.includes('timer') || q.includes('30') || q.includes('seconds') || q.includes('delay') || q.includes('time')) {
        answer = "The <strong>30-second countdown</strong> gives students a grace period. If you stepped out momentarily to drink water, use the restroom, or borrow a notebook, devices remain on. Auto-shutdown only triggers if nobody returns before the countdown completes.";
    } else if (q.includes('money') || q.includes('cost') || q.includes('bill') || q.includes('save') || q.includes('kwh') || q.includes('tariff') || q.includes('calculate') || q.includes('rate') || q.includes('rupee')) {
        answer = "Savings are calculated in real time using each appliance's rated wattage (e.g. 160W lights, 140W fans, 75W ceiling fans) multiplied by the total hours they were prevented from running in empty rooms, priced at the standard institutional electricity tariff of <strong>₹8.50 per kWh</strong>.";
    } else if (q.includes('override') || q.includes('manual') || q.includes('switch') || q.includes('wall') || q.includes('physical')) {
        answer = "Yes! SmartSave works alongside normal wall switches. You can turn appliances ON or OFF manually at any moment, or enable 'Manual Override' to disable automatic shutdown completely.";
    } else if (q.includes('sensor') || q.includes('detect') || q.includes('motion') || q.includes('pir') || q.includes('camera') || q.includes('privacy')) {
        answer = "The system uses simulated passive infrared (PIR) motion and occupancy sensors. They detect heat and motion vectors without cameras or image capture, ensuring 100% student privacy at all times.";
    } else if (q.includes('return') || q.includes('enter') || q.includes('come back') || q.includes('walk in') || q.includes('student returns')) {
        answer = "When someone enters an empty room, the sensor instantly flags occupancy and automatically turns the room's lights and fans back ON. You can test this right now using <em>'Demo Step 3. Student Returns'</em> above!";
    } else if (q.includes('aeiou') || q.includes('fieldwork') || q.includes('observation') || q.includes('research') || q.includes('design thinking')) {
        answer = "Our campus AEIOU observations found that while academic classrooms are usually shut off by staff, hostel rooms and study halls frequently leave high-speed fans and lights running 24/7 because students rush to morning classes and don't pay individual bills. SmartSave specifically automates those neglected spaces.";
    } else if (q.includes('room') || q.includes('classroom') || q.includes('hostel') || q.includes('study')) {
        answer = "SmartSave monitors 8 campus rooms (4 academic classrooms and 4 hostel rooms/study halls). You can use the category filter tabs above to view specific areas or click any switch to test manual control.";
    } else {
        answer = `Regarding "<em>${escapeHtml(query)}</em>": SmartSave monitors room occupancy, runs a 30-second grace timer when everyone leaves, and automatically switches off lights and fans to eliminate electricity wastage. You can test live scenarios using the <strong>Presenter Mode</strong> buttons or toggle any switch manually!`;
    }

    textEl.innerHTML = answer;
    box.classList.add('active');
    box.style.display = 'block';

    // Smoothly ensure answer is visible if scrolled away
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

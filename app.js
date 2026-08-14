document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize Charts
    initCharts();

    // Populate Risk Engine
    renderRiskCards();

    // Setup Event Listeners
    setupModals();
    setupChatDrawer();
    
    // Setup Workload Tracker Widget
    setupWorkloadTracker();

    // Setup Team Stress Dashboard
    renderTeamStressDashboard();

    // Setup Calendar Widget
    setupCalendarWidget();
});

let workloadChartInstance = null;
let teamStressChartInstance = null;

function setupWorkloadTracker() {
    const monthSelect = document.getElementById('month-select');
    const weekSelect = document.getElementById('week-select');
    const ctx = document.getElementById('workloadTrackerChart').getContext('2d');

    const updateChart = () => {
        const month = monthSelect.value;
        const week = weekSelect.value;
        
        // Handle cases where we don't have mock data for a month yet
        const data = mockData.monthlyWorkload[month] && mockData.monthlyWorkload[month][week] 
                     ? mockData.monthlyWorkload[month][week] 
                     : [0, 0, 0, 0, 0];

        if (workloadChartInstance) {
            workloadChartInstance.data.datasets[0].data = data;
            workloadChartInstance.update();
        } else {
            workloadChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    datasets: [{
                        label: 'Tasks Completed',
                        data: data,
                        backgroundColor: '#2563eb',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { 
                            beginAtZero: true,
                            ticks: { color: '#94a3b8' },
                            grid: { color: '#334155' }
                        },
                        x: {
                            ticks: { color: '#94a3b8' },
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    };

    // Initial render
    updateChart();

    // Event listeners for dropdowns
    monthSelect.addEventListener('change', updateChart);
    weekSelect.addEventListener('change', updateChart);
}

function initCharts() {
    // Line Chart
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: mockData.charts.lineData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
            }
        }
    });

    // Doughnut Chart
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: mockData.charts.doughnutData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#f8fafc' } }
            },
            cutout: '70%'
        }
    });
}

function renderRiskCards() {
    const riskList = document.getElementById('risk-list');
    riskList.innerHTML = '';

    mockData.risks.forEach(risk => {
        const card = document.createElement('div');
        card.className = 'risk-card';
        card.innerHTML = `
            <div class="risk-info">
                <div class="risk-tag ${risk.tagClass}">${risk.level}</div>
                <div class="risk-title">${risk.title}</div>
                <div class="text-muted" style="font-size: 0.875rem;">${risk.description}</div>
            </div>
            <button class="btn btn-secondary action-plan-btn" data-id="${risk.id}">
                <i data-lucide="zap"></i> Generate AI Action Plan
            </button>
        `;
        riskList.appendChild(card);
    });

    // Re-initialize icons for new elements
    lucide.createIcons();

    // Add listeners to new buttons
    document.querySelectorAll('.action-plan-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const riskId = parseInt(e.currentTarget.getAttribute('data-id'));
            openActionPlanModal(riskId);
        });
    });
}

function setupModals() {
    // Upload Modal
    const uploadBtn = document.getElementById('upload-btn');
    const uploadModal = document.getElementById('upload-modal');
    const closeUpload = document.getElementById('close-upload');
    const cancelUpload = document.getElementById('cancel-upload');
    const analyzeNotes = document.getElementById('analyze-notes');
    const notesTextarea = document.getElementById('notes-textarea');
    const moraleVal = document.getElementById('morale-val');

    const toggleUploadModal = () => uploadModal.classList.toggle('hidden');

    uploadBtn.addEventListener('click', toggleUploadModal);
    closeUpload.addEventListener('click', toggleUploadModal);
    cancelUpload.addEventListener('click', toggleUploadModal);
    
    uploadModal.addEventListener('click', (e) => {
        if(e.target === uploadModal) toggleUploadModal();
    });

    analyzeNotes.addEventListener('click', () => {
        if (notesTextarea.value.trim() !== '') {
            // Simulate analysis
            analyzeNotes.innerHTML = '<i data-lucide="loader"></i> Analyzing...';
            lucide.createIcons();
            
            setTimeout(() => {
                moraleVal.textContent = '81%';
                moraleVal.style.color = 'var(--color-success)';
                setTimeout(() => moraleVal.style.color = '', 1000);
                
                notesTextarea.value = '';
                analyzeNotes.innerHTML = 'Analyze Notes';
                toggleUploadModal();
                alert('Notes analyzed successfully. Metrics updated.');
            }, 1000);
        } else {
            alert('Please paste some notes to analyze.');
        }
    });

    // Action Plan Modal Close
    const actionPlanModal = document.getElementById('action-plan-modal');
    const closeActionPlan = document.getElementById('close-action-plan');
    
    const toggleActionPlanModal = () => actionPlanModal.classList.toggle('hidden');
    
    closeActionPlan.addEventListener('click', toggleActionPlanModal);
    actionPlanModal.addEventListener('click', (e) => {
        if(e.target === actionPlanModal) toggleActionPlanModal();
    });

    // Team Detail Modal Close
    const teamDetailModal = document.getElementById('team-detail-modal');
    const closeTeamDetail = document.getElementById('close-team-detail');
    
    const toggleTeamDetailModal = () => teamDetailModal.classList.toggle('hidden');

    closeTeamDetail.addEventListener('click', toggleTeamDetailModal);
    teamDetailModal.addEventListener('click', (e) => {
        if(e.target === teamDetailModal) toggleTeamDetailModal();
    });
}

let currentDate = new Date();
let selectedDate = new Date();

function setupCalendarWidget() {
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const addMeetingForm = document.getElementById('add-meeting-form');

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    addMeetingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const time = document.getElementById('meeting-time').value;
        const title = document.getElementById('meeting-title').value;
        const attendees = document.getElementById('meeting-attendees').value;

        // Convert 24h time to 12h time with AM/PM for display
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const formattedTime = `${(h % 12) || 12}:${minutes} ${ampm}`;

        // Get local date string matching selectedDate
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        if (!mockData.meetings) mockData.meetings = {};
        if (!mockData.meetings[dateStr]) mockData.meetings[dateStr] = [];

        mockData.meetings[dateStr].push({
            title: title,
            time: formattedTime,
            attendees: attendees
        });
        
        // Reset form
        addMeetingForm.reset();
        
        // Update UI
        renderCalendar();
        renderMeetingList(dateStr);
    });

    // Initial render
    renderCalendar();
    
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const initialDateStr = `${year}-${month}-${day}`;
    renderMeetingList(initialDateStr);
}

function renderCalendar() {
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarDays = document.getElementById('calendar-days');
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    calendarMonthYear.textContent = `${monthNames[month]} ${year}`;
    
    // First day of the month
    const firstDay = new Date(year, month, 1).getDay();
    // Number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    calendarDays.innerHTML = '';
    
    // Empty cells before start of month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarDays.appendChild(emptyCell);
    }
    
    const today = new Date();
    
    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = i;
        
        const cellDate = new Date(year, month, i);
        
        const cellYear = cellDate.getFullYear();
        const cellMonthStr = String(cellDate.getMonth() + 1).padStart(2, '0');
        const cellDayStr = String(cellDate.getDate()).padStart(2, '0');
        const dateStr = `${cellYear}-${cellMonthStr}-${cellDayStr}`;
        
        if (cellDate.toDateString() === today.toDateString()) {
            dayCell.classList.add('today');
        }
        
        if (cellDate.toDateString() === selectedDate.toDateString()) {
            dayCell.classList.add('selected');
        }
        
        if (mockData.meetings && mockData.meetings[dateStr] && mockData.meetings[dateStr].length > 0) {
            dayCell.classList.add('has-meeting');
        }
        
        dayCell.addEventListener('click', () => {
            selectedDate = new Date(year, month, i);
            renderCalendar();
            renderMeetingList(dateStr);
        });
        
        calendarDays.appendChild(dayCell);
    }
}

function renderMeetingList(dateStr) {
    const meetingList = document.getElementById('meeting-list');
    const selectedDateDisplay = document.getElementById('selected-date-display');
    
    // Parse the date components specifically to avoid timezone issues when converting from ISO string
    const [year, month, day] = dateStr.split('-');
    const displayDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    selectedDateDisplay.textContent = displayDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    
    meetingList.innerHTML = '';
    
    const meetings = (mockData.meetings && mockData.meetings[dateStr]) || [];
    
    if (meetings.length === 0) {
        meetingList.innerHTML = '<li class="no-meetings">No meetings scheduled.</li>';
        return;
    }
    
    meetings.forEach(meeting => {
        const li = document.createElement('li');
        li.className = 'meeting-item';
        li.innerHTML = `
            <div class="meeting-time">${meeting.time}</div>
            <div class="meeting-title">${meeting.title}</div>
            ${meeting.attendees ? `<div class="meeting-attendees"><i data-lucide="users" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:4px;"></i>${meeting.attendees}</div>` : ''}
        `;
        meetingList.appendChild(li);
    });
    
    lucide.createIcons();
}

function renderTeamStressDashboard() {
    const teamsGrid = document.getElementById('teams-grid');
    const spotlight = document.getElementById('most-stressed-spotlight');
    
    // Find most stressed team
    const mostStressed = mockData.teamStressData.reduce((prev, current) => 
        (prev.stressScore > current.stressScore) ? prev : current
    );

    // Render Spotlight
    spotlight.innerHTML = `
        <div class="most-stressed-info">
            <h3><i data-lucide="alert-triangle"></i> Highest Stress Alert: ${mostStressed.name} Team</h3>
            <div class="text-muted" style="margin-top: 0.5rem;">Score: <span class="stress-score warning">${mostStressed.stressScore}</span> (Trend: <span class="trend-${mostStressed.trendDirection}">${mostStressed.trend}</span>)</div>
            <p class="text-muted" style="margin-top: 0.5rem; font-size: 0.875rem;">${mostStressed.feedback}</p>
            <div style="margin-top: 0.5rem; font-size: 0.875rem; color: #94a3b8;">
                <strong>Members:</strong> ${mostStressed.members.map(m => m.name).join(', ')}
            </div>
        </div>
        <button class="btn btn-primary team-card-btn" data-team-id="${mostStressed.id}">View Details</button>
    `;

    // Render Grid
    teamsGrid.innerHTML = '';
    mockData.teamStressData.forEach(team => {
        const card = document.createElement('div');
        card.className = 'team-card team-card-btn';
        card.setAttribute('data-team-id', team.id);
        
        let scoreClass = 'text-primary';
        if(team.stressScore >= 80) scoreClass = 'danger';
        else if (team.stressScore >= 60) scoreClass = 'warning';
        else scoreClass = 'success';

        card.innerHTML = `
            <div class="team-card-header">
                <h3>${team.name}</h3>
                <i data-lucide="chevron-right" class="text-muted"></i>
            </div>
            <div>
                <div class="text-muted" style="font-size: 0.75rem; text-transform: uppercase;">Avg Stress Score</div>
                <div class="stress-score ${scoreClass}">${team.stressScore}</div>
                <div style="font-size: 0.75rem;" class="trend-${team.trendDirection}">
                    <i data-lucide="${team.trendDirection === 'up' ? 'trending-up' : 'trending-down'}"></i> ${team.trend} this week
                </div>
            </div>
        `;
        teamsGrid.appendChild(card);
    });

    lucide.createIcons();

    // Attach click listeners to cards and buttons
    document.querySelectorAll('.team-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const teamId = e.currentTarget.getAttribute('data-team-id');
            openTeamDetailModal(teamId);
        });
    });
}

function openTeamDetailModal(teamId) {
    const team = mockData.teamStressData.find(t => t.id === teamId);
    if (!team) return;

    // Show modal first to ensure Chart.js renders with correct dimensions
    document.getElementById('team-detail-modal').classList.remove('hidden');

    document.getElementById('team-detail-title').textContent = `${team.name} Team Details`;
    
    const membersList = document.getElementById('team-members-list');
    membersList.innerHTML = team.members.map(m => `
        <li class="member-item">
            <div>
                <div class="member-name">${m.name}</div>
                <div class="member-role">${m.role}</div>
            </div>
            <div style="font-weight: bold; color: ${m.score > 75 ? 'var(--color-danger)' : 'var(--text-primary)'}">${m.score}</div>
        </li>
    `).join('');

    document.getElementById('team-feedback-text').textContent = team.feedback;
    
    const suggestionsList = document.getElementById('team-suggestions-list');
    suggestionsList.innerHTML = team.suggestions.map(s => `<li>${s}</li>`).join('');

    // Update Chart
    const ctx = document.getElementById('teamStressChart').getContext('2d');
    
    const datasets = team.members.map((m, index) => {
        const colors = ['#2563eb', '#eab308', '#22c55e', '#ef4444'];
        return {
            label: m.name,
            data: m.history,
            borderColor: colors[index % colors.length],
            tension: 0.3,
            fill: false
        };
    });

    if (teamStressChartInstance) {
        teamStressChartInstance.destroy();
    }

    teamStressChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week -5', 'Week -4', 'Week -3', 'Week -2', 'Week -1', 'Current'],
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            },
            scales: {
                y: { min: 0, max: 100, ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
                x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
            }
        }
    });
}


function openActionPlanModal(riskId) {
    const risk = mockData.risks.find(r => r.id === riskId);
    if (!risk) return;

    const modal = document.getElementById('action-plan-modal');
    const body = document.getElementById('action-plan-body');
    
    body.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <strong>Target Issue:</strong> ${risk.title}
        </div>
        <div class="action-plan-content">
            ${risk.actionPlan}
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function setupChatDrawer() {
    const toggleBtn = document.getElementById('copilot-toggle');
    const drawer = document.getElementById('chat-drawer');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-chat');
    const input = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');
    const quickReplies = document.querySelectorAll('.quick-reply');

    const toggleDrawer = () => drawer.classList.toggle('hidden');

    toggleBtn.addEventListener('click', toggleDrawer);
    closeBtn.addEventListener('click', toggleDrawer);

    const appendMessage = (text, isUser = false) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${isUser ? 'user-msg' : 'bot-msg'}`;
        // Preserve newlines
        msgDiv.innerHTML = text.replace(/\n/g, '<br>');
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const showTyping = () => {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const hideTyping = () => {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    };

    const handleSend = (text, type = 'default') => {
        if (!text.trim()) return;
        
        appendMessage(text, true);
        input.value = '';
        
        showTyping();

        setTimeout(() => {
            hideTyping();
            appendMessage(mockData.chatResponses[type] || mockData.chatResponses.default);
        }, 600);
    };

    sendBtn.addEventListener('click', () => handleSend(input.value));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend(input.value);
    });

    quickReplies.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = e.target.textContent;
            let type = 'default';
            if (text.includes('1-on-1')) type = 'draftAgenda';
            else if (text.includes('Friction')) type = 'analyzeFriction';
            else if (text.includes('Email')) type = 'generateEmail';
            
            handleSend(text, type);
        });
    });
}

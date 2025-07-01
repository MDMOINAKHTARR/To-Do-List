 class HeroTodoApp {
            constructor() {
                this.tasks = [];
                this.currentFilter = 'all';
                this.editingTaskId = null;
                this.init();
            }

            init() {
                this.bindEvents();
                this.render();
                this.updateStats();
                this.animateOnLoad();
            }

            bindEvents() {
                document.getElementById('addBtn').addEventListener('click', () => this.addTask());
                document.getElementById('taskInput').addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') this.addTask();
                });
                // Add filter button events
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        this.currentFilter = btn.getAttribute('data-filter');
                        this.render();
                    });
                });
            }

            addTask() {
                const input = document.getElementById('taskInput');
                const text = input.value.trim();
                if (!text) return;

                const newTask = {
                    id: Date.now(),
                    text: text,
                    completed: false
                };

                this.tasks.push(newTask);
                this.render();
                this.updateStats();
                input.value = '';
            }

            render() {
                const tasksList = document.getElementById('tasksList');
                let filteredTasks = [];
                if (this.currentFilter === 'all') {
                    filteredTasks = this.tasks;
                } else if (this.currentFilter === 'active') {
                    filteredTasks = this.tasks.filter(task => !task.completed);
                } else if (this.currentFilter === 'completed') {
                    filteredTasks = this.tasks.filter(task => task.completed);
                }

                if (!filteredTasks.length) {
                    tasksList.innerHTML = `
                        <div class="empty-state">
                            <div class="hero-icon">🦸</div>
                            <h3>READY FOR ACTION</h3>
                            <p>The city needs you, hero. Deploy your first mission!</p>
                        </div>
                    `;
                    return;
                }

                tasksList.innerHTML = filteredTasks.map(task => `
                    <div class="task-item${task.completed ? ' completed' : ''}">
                        <div class="task-checkbox${task.completed ? ' checked' : ''}" data-id="${task.id}"></div>
                        <div class="task-text">${task.text}</div>
                    </div>
                `).join('');

                // Add event listeners for checkboxes
                Array.from(document.getElementsByClassName('task-checkbox')).forEach(checkbox => {
                    checkbox.addEventListener('click', (e) => {
                        const id = Number(checkbox.getAttribute('data-id'));
                        this.toggleCompleteTask(id);
                    });
                });
            }

            updateStats() {
                const total = this.tasks.length;
                const completed = this.tasks.filter(task => task.completed).length;
                const active = total - completed;
                document.getElementById('totalTasks').textContent = total;
                document.getElementById('activeTasks').textContent = active;
                document.getElementById('completedTasks').textContent = completed;
            }

            toggleCompleteTask(id) {
                const task = this.tasks.find(task => task.id === id);
                if (task) {
                    task.completed = !task.completed;
                    this.render();
                    this.updateStats();
                }
            }

        }
        new HeroTodoApp();

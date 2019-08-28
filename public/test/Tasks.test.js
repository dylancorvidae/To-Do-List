import Tasks from '../src/component/todo/Tasks.js';
const test = QUnit.test;

QUnit.module('Tasks');

test('1renders', assert => {
    // arrange
    const task = {
        id: 4,
        name: 'Practice code',
        completed: false
    };

    const expected = /*html*/`
    <li class="tasks">
    <span class="${task.completed ? 'complete' : ''}">${task.name}</span>
    <div class="task-buttons">
        <button class="complete-button">    
            ${task.completed ? ' Complete ' : ' Incomplete '}
        </button>
        <button class="remove-button">
            🗑
        </button>
    </div>
    </li>
    `;

    // act
    const specificTask = new Tasks({ task });
    const html = specificTask.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});

test('2renders', assert => {
    // arrange
    const task = {
        id: 14,
        name: 'Bad Task',
        completed: true
    };

    const expected = /*html*/`
    <li class="tasks">
    <span class="${task.completed ? 'complete' : ''}">${task.name}</span>
    <div class="task-buttons">
        <button class="complete-button">    
            ${task.completed ? ' Complete ' : ' Incomplete '}
        </button>
        <button class="remove-button">
            🗑
        </button>
    </div>
    </li>
    `;

    // act
    const specificTask = new Tasks({ task });
    const html = specificTask.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});
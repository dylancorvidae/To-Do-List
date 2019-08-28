import Tasks from '../component/todo/Tasks.js';
const test = QUnit.test;

QUnit.module('Tasks');

skip('renders', assert => {
    // arrange
    const task = {
        id: 4,
        name: 'Practice code',
        complete: false
    };

    const expected = /*html*/`
        <li class="tasks"> <span class="${task.complete ? 'complete' : ''}">${task.name}</span>
            <div>
                <button class="complete-button"> Make complete </button>
                <button class="remove-button"> 🗑 </button>
            </div>
        </li>
    `;

    // act
    const specificTask = new Tasks({ task });
    const html = specificTask.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});

skip('renders', assert => {
    // arrange
    const task = {
        id: 14,
        name: 'Bad Task',
        complete: true
    };

    const expected = /*html*/`
        <li class="tasks"> <span class="${task.complete ? 'complete' : ''}">${task.name}</span>
            <div>
                <button class="complete-button"> Make Incomplete </button>
                <button class="remove-button"> 🗑 </button>
            </div>
        </li>
    `;

    // act
    const specificTask = new Tasks({ task });
    const html = specificTask.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});


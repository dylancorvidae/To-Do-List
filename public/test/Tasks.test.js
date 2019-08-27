import Tasks from '../component/todo/Tasks.js';
const test = QUnit.test;

QUnit.module('Tasks');

test('renders', assert => {
    // arrange
    const task = {
        id: 4,
        name: 'Practice code',
        inactive: false
    };

    const expected = /*html*/`
        <li class="tasks"> <span class="${task.inactive ? 'inactive' : ''}">${task.name}</span>
            <div>
                <button class="inactive-button"> Make Inactive </button>
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

test('renders', assert => {
    // arrange
    const task = {
        id: 14,
        name: 'Bad Task',
        inactive: true
    };

    const expected = /*html*/`
        <li class="tasks"> <span class="${task.inactive ? 'inactive' : ''}">${task.name}</span>
            <div>
                <button class="inactive-button"> Make Active </button>
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




export let store_ = {
    _state: {
        notes: {
            categories: [
                {id: 1, name: "nm", notes: [
                        {id: 1, name: "title"},
                        {id: 2, name: "title2"}
                    ]
                },
                {id: 2, name: "nm2", notes: [
                        {id: 3, name: "title"},
                        {id: 4, name: "title2"}
                    ]
                },
            ],
            details: {name: "qwe", text: "ddsa"}
        },
        matrix: {
            matrices: [
                {id: 1, noteTasks: [
                        {id: 1, name: "name"},
                        {id: 2, name: "name"},
                        {id: 3, name: "name"}
                    ]}
            ],
            details: {name: "name", text: "text"}
        },
        progress: {
            blocks: [
                {id: 1, list: [
                        {name: "name", seconds: 12},
                        {name: "name", seconds: 12},
                        {name: "name", seconds: 12}
                        ]
                }
            ],
            details: {name: "name", text: "text"}
        }
    }
}
let node = [{
        id: '0',
        child: [{
                id: '01',
                child: [{
                    id: '001',
                    child: [{
                        id: '0001',
                        child: []
                    }]
                }]
            },
            {
                id: '01',
            },
        ]
    },
    {
        id: 1,
        child: [{
            id: 11,
            child: []
        }]
    },
    {
        id: 2,
        child: []
    },
    {
        id: 3,
        child: [{
                id: 31,
                child: [{
                        id: 311,
                        child: [{
                            id: 3111
                        }]
                    },
                    {
                        id: 312,
                        child: [{
                            id: 3121
                        }]
                    }
                ]
            },
            {
                id: 32,
            },
        ]
    }
]


//深度遍历 递归版本
function dfs(node, nodeList = []) {
    if (Array.isArray(node)) {
        node.forEach((item, i, arr) => {
            nodeList.push(item.id);
            if (Array.isArray(item.child) && item.child.length !== 0) {
                return dfs(item.child, nodeList);
            }
        })
    }
    return nodeList;
}
// console.log('递归版本', dfs(node));

//深度遍历 非递归版本
function dfsNotDg(node) {
    var nodeList = [];
    var stack = [];
    stack.push(node);
    while (stack.length !== 0) {
        var item = stack.pop();
        if (item !== node) {
            nodeList.push(item.id);
        }
        var child = item.child ? item.child : item;
        if (Array.isArray(child)) {
            child.forEach((aitem, i, arr) => {
                stack.push(aitem)
            })
        }
    }
    return nodeList;
}
// console.log('非递归', dfsNotDg(node))

//广度遍历 非递归版本
function breadthFirstSearch(node) {
    let nodes = [];
    let stack = []
    stack.push(node);
    if (node && Array.isArray(node)) {
        while (!!stack.length) {
            let item = stack.shift();
            if (item !== node) {
                nodes.push(item.id)
            }
            var child = item.child ? item.child : item;
            if (Array.isArray(child)) {
                child.forEach((obj) => {
                    stack.push(obj)
                })
            }
        }
    }
    return nodes;
}
// console.log(breadthFirstSearch(node))

//广度遍历
function findPathBFS(source, id) {
    var dataSource = JSON.parse(JSON.stringify(source));

    var res = []
    // 每一层的数据都 push 进 res
    res.push(...dataSource)
    //不能使用forEach
    for (let i = 0; i < res.length; i++) {
        var curData = res[i];
        if (curData.id == id) {
            var result = []; //返回的结果
            return (function find(data) {
                result.unshift(data.id)
                if (data.parent) return find(data.parent);
                return result
            })(curData)
        }
        // 如果有 child 则 push 进 res 中待搜索
        if (curData.child) {
            res.push(...curData.child.map(d => {
                // 在每一个数据中增加 parent，为了记录路径使用
                d.parent = curData
                return d;
            }))
            console.log(res)
        }
    }
    return [];
}

console.log(findPathBFS(node, 3111));
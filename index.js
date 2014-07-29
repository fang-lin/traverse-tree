/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var treeData = {
    id: '0-0',
    children: [{
        id: '1-0',
        children: [{
            id: '2-0',
            children: [ { id: '3-0' }, { id: '3-1' } ]
        }, {
            id: '2-1',
            children: [ { id: '3-2' }, { id: '3-3' } ]
        }]
    }, {
        id: '1-1',
        children: [{
            id: '2-2',
            children: [ { id: '3-4' }, { id: '3-5' } ]
        }, {
            id: '2-3',
            children: [ { id: '3-6' }, { id: '3-7' }, { id: '3-8' } ]
        }]
    }, {
        id: '1-2',
        children: [ { id: '2-4' }, { id: '2-5' }, { id: '2-6' }, { id: '2-7' }, { id: '2-8' }, { id: '2-9' } ]
    }]
};

function DFSPreOrder(tree) {
    var list = [];
    (function traverse(subTree) {
        list.push(subTree.id);

        if (subTree.children) {
            subTree.children.forEach(function (tree) {
                traverse(tree);
            });
        }
    })(tree);

    return list;
}

function DFSPostOrder(tree) {
    var list = [];
    (function traverse(subTree) {
        if (subTree.children) {
            subTree.children.forEach(function (tree) {
                traverse(tree);
            });
        }
        list.push(subTree.id);
    })(tree);

    return list;
}

function BFS(tree) {
    var list = [];
    (function traverse(trees) {
        var subTrees = [];
        trees.forEach(function (tree) {
            list.push(tree.id);
            if (tree.children) {
                subTrees = subTrees.concat(tree.children);
            }
        });
        subTrees.length && traverse(subTrees);
    })([tree]);

    return list;
}

function BFSStratified(tree) {
    var list = [];
    (function traverse(trees) {
        var subTrees = [],
            level = [];
        trees.forEach(function (tree) {
            level.push(tree.id);
            if (tree.children) {
                subTrees = subTrees.concat(tree.children);
            }
        });
        list.push(level);
        subTrees.length && traverse(subTrees);
    })([tree]);

    return list;
}

function paths(tree) {
    var paths = [];

    (function traverse(subTree, basePath) {
        basePath.push(subTree.id);

        if (subTree.children) {
            subTree.children.forEach(function (node) {
                traverse(node, basePath.concat());
            });
        } else {
            paths.push(basePath);
        }
    })(tree, []);

    return paths;
}

console.log('DFSPreOrder:');
console.log(DFSPreOrder(treeData).join(','));

console.log('---------------------------------------------------------------------------------');
console.log('DFSPostOrder:');
console.log(DFSPostOrder(treeData).join(','));

console.log('---------------------------------------------------------------------------------');
console.log('BFS:');
console.log(BFS(treeData).join(','));

console.log('---------------------------------------------------------------------------------');
console.log('BFSStratified:');
console.log(BFSStratified(treeData));

console.log('---------------------------------------------------------------------------------');
console.log('paths:');
console.log(paths(treeData));
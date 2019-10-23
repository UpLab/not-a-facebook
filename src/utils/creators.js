import faker from 'faker';

// eslint-disable-next-line import/prefer-default-export
const createPost = (value) => ({
    id: faker.random.uuid(),
    body: value,
});

const addID = (obj) => {
    obj['id'] = obj.hasOwnProperty('id')? obj['id']: obj['id'] = faker.random.uuid() 
    return obj;
};

const addCreateAt = (obj) => {
    obj['createAt'] = obj.hasOwnProperty('createAt')? obj['createAt']: obj['createAt'] = new Date().getTime(); 
    return obj;
};

export {createPost, addID, addCreateAt};

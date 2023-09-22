export function userListReducer(users, action) {
    switch (action.type) {
        case 'initial': {
            return [...action.users]
        }
        break;
        case 'updated': {
            // return [
            //     ...users,
            //     {
            //         id: action.user.id,
            //         name: action.user.name,
            //         email: action.email,
            //         role: action.role
            //     }
            // ]
            return [
                ...users.map(user=>action.user.id==user.id? action.user : user)
            ]
        };
            break;
        case 'delete': {
            return users.filter(user =>
                action.id != user.id)
        };
            break;
        case 'delete_mulitple': {
            const removeList = action.ids;
            return users.filter(user => !removeList.includes(user['id']))
        }
        case 'search': {
            return users.filter((user) => {
                console.log(action)
                return user.name.includes(action.searchTerm) || user.email.includes(action.searchTerm);
            })
        }
            break;
        default: {
            alert('Not a valid action type ' + action.type);
        }
    }
}

import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(function UsersList() {
    const { userStore } = useStore();
    const { loadUsers, usersArr, userRegistry } = userStore;

    useEffect(() => {
        if (userRegistry.size <= 1) loadUsers();
    }, [userRegistry.size, loadUsers])

    return (
        <Segment>
            <Item.Group divided>
                {usersArr.map(user => (
                    <Item key={user.id}>
                        <Item.Header as='a'>{user.id}</Item.Header>
                        <Item.Meta>{user.displayName} {user.userName}</Item.Meta>
                        <Item.Description style={{ marginLeft: '20px' }}>
                            <div>{user.email}</div>
                            <div>{user.bio}</div>
                            <div>{user.isConfirmed.toString()}</div>
                        </Item.Description>
                        {/* <Item.Extra>
                            <Button
                                content="Confirm"
                                color="green"
                                onClick={(e) => handleStudentConfirm(e, student.appUserId)}
                                // loading={loading && target === student.id}
                                name={student.id}
                            //me hek butonin nese osht confirmed
                            />
                            <Button
                                as={Link} to={`/students/${student.id}`}
                                floated="right"
                                content='View'
                                color="blue" />
                            <Button
                                name={student.id}
                                loading={loading && target === student.id}
                                onClick={(e) => handleStudentDelete(e, student.id)}
                                floated="right"
                                content='Delete'
                                color="red" />
                        </Item.Extra> */}
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
import React from 'react'
import { Table } from 'react-bootstrap';

function UserTable({users, updateUserPermissions}) {
  return (
    <div>
        <Table hover striped bordered>
          <thead>
              <tr>
                  <th>氏名</th>
                  <th>メールアドレス</th>
                  <th>ロール</th>
                  <th>アクション</th>
              </tr>
          </thead>
          <tbody>
              {users.map((user) => 
                  <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin? "管理者" : 'ユーザ'}
                      </td>
                      <td>
                          <div className="d-flex gap-3">
                            {user.isBlocked ? (
                            <p 
                            className='underline' 
                            onClick={()=> {
                              updateUserPermissions(user, "unblock");
                            }}>ブロック解除</p>
                            ) : (
                              <p 
                              className='underline' 
                              onClick={()=> {
                                updateUserPermissions(user, "block");
                              }}>ブロック</p>
                            )}

                            {user.isAdmin ? (
                            <p 
                            className='underline' 
                            onClick={()=> {
                              updateUserPermissions(user, "remove-admin");
                            }}>管理者から外す</p>
                            ) : (
                              <p 
                              className='underline' 
                              onClick={()=> {
                                updateUserPermissions(user, "make-admin");
                              }}>管理者にする</p>
                            )}
                          </div>
                      </td>
                  </tr>
              )}
          </tbody>
        </Table>
    </div>
  )
}

export default UserTable
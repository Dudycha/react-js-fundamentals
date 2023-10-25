import React from "react";
import Table from "react-bootstrap/Table";
 
function CookbookTableList(props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Jméno</th>
        </tr>
      </thead>
      <tbody>
        {props.cookbookList.map((cookbook) => {
          return (
            <tr key={cookbook.id}>
              <td>{cookbook.name}</td>

            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CookbookTableList;
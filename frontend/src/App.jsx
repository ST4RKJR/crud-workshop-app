import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function getData() {
      const list = await fetch("http://localhost:8080/contacts");
      const list_json = await list.json();
      return list_json;
    }
    getData().then((data) => {
      setContacts(data);
    });
  });

  return (
    <>
      <div>
        <h1>Contact Manager</h1>
      </div>

      <div>
        <ul>
          {contacts.map((contact) => {
            return (
              <>
                <li>
                  {contact.name} - {contact.email}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;

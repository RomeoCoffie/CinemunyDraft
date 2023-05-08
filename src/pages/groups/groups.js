import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useCollection } from '../../Hooks/useCollection';

//import Button from '@mui/material/Button';
import Group from './group';
import './groups.css';

export default function Groups() {
  // const [readMore, setReadMore] = useState(false);
  const { documents: data } = useCollection('Groups', ['createdAt', 'desc']); //get groups
  const [groups, setGroups] = useState(null);
  //const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setGroups(data);
    }
  }, [groups, data]);

  return (
    <section className="groups-section">
      <main>
        <div className="add-group">
          <a
            className="add"
            href="https://chat.whatsapp.com/Hhyiwp0UPzX3VDXLwY7oi6"
          >
            Add Group
          </a>
        </div>
        <div className="groups-head">
          <h2>Groups</h2>
        </div>

        {groups &&
          groups.map((group, grpIndex) => {
            // const { grpName, img, url, about, ppleOnline } = group;
            return <Group key={grpIndex} {...group} />;
          })}
      </main>
    </section>
  );
}

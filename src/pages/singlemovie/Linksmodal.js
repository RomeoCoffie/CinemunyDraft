import React from 'react';
import './linksmodal.css';

export default function Linksmodal({
  theLinks,
  showLinksModal,
  setShowLinksModal,
}) {
  return (
    <section
      className={`${
        showLinksModal ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className="modal-content">
        {theLinks &&
          theLinks.map((url, index) => {
            //console.log(url, url.length);
            if (url[1] && url[0] != 'createdAt') {
              console.log('Not empty');
              let vod = url[0];
              let theurl = url[1];
              return (
                <ul className="urlscontainer">
                  <li key={index}>
                    <a href={theurl}> {vod}</a>
                  </li>
                </ul>
              );
            }

            return;
          })}

        <button className="close-btn" onClick={() => setShowLinksModal(false)}>
          ok
        </button>
      </div>
    </section>
  );
}

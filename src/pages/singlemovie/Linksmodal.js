import React from 'react';
import './linksmodal.css';

//this modal displays links to shows or movies

export default function Linksmodal({
  theLinks,
  showLinksModal,
  setShowLinksModal,
  contentType,
  film,
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
            if (url[1] && url[0] !== 'createdAt') {
              console.log('Not empty');
              let vod = url[0];
              let theurl = url[1];
              return (
                <ul className="urlscontainer">
                  <li key={index}>
                    <a href={theurl}>{vod}</a>
                  </li>
                </ul>
              );
            }
          })}
        {contentType && contentType === 'show' && (
          <div className="get-movie-div">
            <a
              className="get-movie"
              href="https://chat.whatsapp.com/Hhyiwp0UPzX3VDXLwY7oi6"
            >
              Get this series
            </a>
          </div>
        )}
        {film && film.contentType === 'movie' && (
          <div className="get-movie-div">
            <a
              className="get-movie"
              href="https://chat.whatsapp.com/Hhyiwp0UPzX3VDXLwY7oi6"
            >
              Get this movie
            </a>
          </div>
        )}

        <button className="close-btn" onClick={() => setShowLinksModal(false)}>
          ok
        </button>
      </div>
    </section>
  );
}

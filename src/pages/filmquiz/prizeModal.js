import React from 'react';
import './prizemodal.css';
import { GoStar } from 'react-icons/go';

export default function Prizemodal({ showPrizeModal, setShowPrizeModal }) {
  console.log(showPrizeModal);

  return (
    <main
      className={`${
        showPrizeModal ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <section className="modal-content">
        <div className="prizes">
          <p> Average:</p>
          <GoStar style={{ color: 'crimson' }} />
        </div>
        <div className="prizes">
          <p> Beyond Average:</p>
          <GoStar style={{ color: 'crimson' }} />
          <GoStar style={{ color: 'crimson' }} />
        </div>

        <div>
          <p>Half-baked Guru</p>
          <GoStar style={{ color: 'crimson' }} />
          <GoStar style={{ color: 'crimson' }} />
          <GoStar style={{ color: 'crimson' }} />
        </div>
        <img src="/img/capb.png" className="prize-img" />

        <div>
          <p> Guru</p>
          <GoStar style={{ color: 'crimson' }} />
          <GoStar style={{ color: 'crimson' }} />
          <GoStar style={{ color: 'crimson' }} />
          <GoStar style={{ color: 'crimson' }} />
          <GoStar style={{ color: 'crimson' }} />
        </div>
        <img src="/img/capb.png" className="prize-img" />
        <img src="/img/mcrb.jpg" className="prize-img" />

        <button className="close-btn" onClick={() => setShowPrizeModal(false)}>
          ok
        </button>
      </section>
    </main>
  );
}

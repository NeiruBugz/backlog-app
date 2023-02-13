import { useState } from 'react';
import { message, Modal } from 'antd';
import { api } from '@shared';
import { PlatformTag } from '@widgets';
import { InfoModal } from '../info-modal';

import type { HowLongToBeatEntry } from 'howlongtobeat';
import type { Game as GameProps, GameStatus } from '@entities';

import styles from './styles.module.scss';

const GameCard = ({ title, platform, img, status }: GameProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameInfo, setGameInfo] = useState<HowLongToBeatEntry | null>(null);

  const showModal = () => {
    api
      .details(title)
      .then((result) => {
        setGameInfo(result);
        setIsModalOpen(true);
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles['ba-card-alt']} onClick={showModal}>
        <img src={img} className={styles['ba-card-alt__image']} />
        <div className={styles['ba-card-alt__info']}>
          <PlatformTag platform={platform} />
          <h3 className={styles['ba-card-alt__title']}>{title}</h3>
        </div>
      </div>
      {gameInfo !== null ? (
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <InfoModal gameInfo={gameInfo} status={status as GameStatus} />
        </Modal>
      ) : null}
    </>
  );
};

export { GameCard };

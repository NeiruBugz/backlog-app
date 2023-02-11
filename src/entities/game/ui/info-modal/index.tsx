import { Typography, Tag, Input, Rate, Button } from 'antd';
import { HowLongToBeatEntry } from 'howlongtobeat';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PlatformTag } from '@widgets';
import { EditOutlined } from '@ant-design/icons';

import type { GameStatus } from '@entities';

const Tags = ({ platforms, id }: Pick<HowLongToBeatEntry, 'id' | 'platforms'>) => {
  const { t } = useTranslation();
  if (platforms.length === 0) {
    return <></>;
  }

  return (
    <div>
      <Typography.Title level={5}>{t('games-list.searchResults.playableOn')}</Typography.Title>
      <div>
        {platforms.map((platform) => {
          return (
            <PlatformTag platform={platform} key={`${platform}--${id}`} style={{ margin: 2 }} />
          );
        })}
      </div>
    </div>
  );
};

const Completions = ({
  gameplayCompletionist,
  gameplayMain,
  gameplayMainExtra,
}: Pick<HowLongToBeatEntry, 'gameplayCompletionist' | 'gameplayMain' | 'gameplayMainExtra'>) => {
  const { t } = useTranslation();
  const determinePluralityKey = useCallback((count: number): string => {
    if (count === 1) {
      return 'hours_one';
    } else if (count > 4 || count === 0) {
      return 'hours_many';
    } else {
      return 'hours_few';
    }
  }, []);

  return (
    <div>
      <Typography.Title level={5}>
        {t('games-list.searchResults.completion.completionHours')}
      </Typography.Title>
      <div>
        <Tag style={{ margin: 2 }}>
          {t('games-list.searchResults.completion.main')}:{' '}
          {t(`games-list.searchResults.completion.${determinePluralityKey(gameplayMain)}`, {
            count: gameplayMain,
          })}
        </Tag>
        <Tag style={{ margin: 2 }}>
          {t('games-list.searchResults.completion.mainExtra')}:{' '}
          {t(`games-list.searchResults.completion.${determinePluralityKey(gameplayMainExtra)}`, {
            count: gameplayMainExtra,
          })}
        </Tag>
        <Tag style={{ margin: 2 }}>
          {t('games-list.searchResults.completion.completionist')}:{' '}
          {t(
            `games-list.searchResults.completion.${determinePluralityKey(gameplayCompletionist)}`,
            { count: gameplayCompletionist }
          )}
        </Tag>
      </div>
    </div>
  );
};

const InfoModal = ({
  gameInfo,
  review = 'Great Game',
  status,
}: {
  gameInfo: HowLongToBeatEntry;
  status: GameStatus;
  review?: string;
}) => {
  const [editedReview, setReview] = useState(review);

  useEffect(() => {
    setReview(review);
  }, [review]);

  const onEditClick = () => {
    setReview('');
  };

  const onEditCancel = () => {
    setReview(review);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <img src={gameInfo.imageUrl} alt={`${gameInfo.name}'s poster`} width={'100%'} />
        <div>
          <Tags platforms={gameInfo?.platforms || []} id={gameInfo.id} />
          <Completions
            gameplayCompletionist={gameInfo?.gameplayCompletionist || 0}
            gameplayMain={gameInfo?.gameplayMain || 0}
            gameplayMainExtra={gameInfo?.gameplayMainExtra || 0}
          />
        </div>
      </div>
      {status !== 'backlog' ? (
        <>
          <Typography.Title level={5}>
            Review your playthrough
            {review ? <EditOutlined style={{ marginLeft: 8 }} onClick={onEditClick} /> : null}
          </Typography.Title>
          {editedReview ? (
            <Typography>{review}</Typography>
          ) : (
            <>
              <Input.TextArea placeholder="Take a note on your playthrough" />
              <Button onClick={onEditCancel} style={{ marginTop: 4 }}>
                Cancel editing
              </Button>
            </>
          )}
          <Typography.Title level={5}>Rate the game</Typography.Title>
          <Rate allowHalf />
        </>
      ) : null}
    </>
  );
};

export { InfoModal };

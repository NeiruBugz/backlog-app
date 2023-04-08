const PLATFORM_OPTIONS = [
  {
    value: 'playstation',
    label: 'Playstation',
  },
  {
    value: 'xbox',
    label: 'Xbox',
  },
  {
    value: 'nintendo',
    label: 'Nintendo',
  },
  {
    value: 'pc',
    label: 'PC',
  },
];

const STATUS_OPTIONS = [
  {
    value: 'backlog',
    label: 'Backlog',
  },
  {
    value: 'in-progress',
    label: 'In Progress',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
];

const translateStatus = (
  statusItem: { value: string; label: string },
  cb: (value: string) => string
) => {
  const withTranslation = { ...statusItem };
  withTranslation.label = cb(`common.${withTranslation.value}`);
  return withTranslation;
};

export { PLATFORM_OPTIONS, STATUS_OPTIONS, translateStatus };

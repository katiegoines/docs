import { Icon } from '@aws-amplify/ui-react';

export const IconPencil = ({ ...rest }) => {
  return (
    <Icon
      aria-hidden="true"
      {...rest}
      viewBox={{
        minX: 0,
        minY: 0,
        width: 24,
        height: 24
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.292 0.500266C21.6251 -0.166754 20.5435 -0.166756 19.8766 0.500266L17.4608 2.91607L21.084 6.53931L23.4998 4.1235C24.1667 3.45649 24.1667 2.37503 23.4998 1.70802L22.292 0.500266ZM19.8762 7.74706L16.253 4.12383L4.17586 16.2009L7.79909 19.8241L19.8762 7.74706ZM1.94112 18.4357L2.96812 17.4086L6.59135 21.032L5.56436 22.0589C5.39829 22.2251 5.19975 22.355 4.98114 22.4409L1.1684 23.9387C0.474248 24.2115 -0.211433 23.5259 0.0612716 22.8316L1.55914 19.0189C1.64501 18.8003 1.77505 18.6019 1.94112 18.4357ZM8.52983 23.9903H23.9023V20.5743H11.9458L8.52983 23.9903Z"
        fill="currentColor"
      />
    </Icon>
  );
};

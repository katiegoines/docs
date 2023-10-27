import { Icon } from '@aws-amplify/ui-react';

export const IconJS = ({ ...rest }) => {
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
      <rect width="24" height="24" fill="#F0DB4F" />
      <rect
        className="icon-monochrome"
        width="24"
        height="24"
        fill="var(--amplify-colors-neutral-100)"
      />
      <path
        d="M14.2009 19.7539C14.857 21.0556 16.2025 22.0509 18.2841 22.0509C20.4145 22.0509 21.9998 20.9431 21.9998 18.9189C21.9998 16.6913 20.4753 16.0106 18.4606 15.1444C17.4992 14.7269 17.0829 14.4542 17.0829 13.7794C17.0829 13.2339 17.4992 12.8164 18.1564 12.8164C18.797 12.8164 19.2133 13.0891 19.5974 13.7794L21.3426 12.6549C20.6066 11.3544 19.5807 10.8568 18.1564 10.8568C16.1536 10.8568 14.8725 12.1416 14.8725 13.8273C14.8725 15.6589 15.9461 16.5262 17.5636 17.2165C18.4713 17.6065 19.7572 17.9846 19.7572 18.9512C19.7572 19.5936 19.1644 20.059 18.2363 20.059C17.1306 20.059 16.5067 19.4812 16.026 18.694L14.2009 19.7539Z"
        fill="#fff"
      />
      <path
        d="M9.70503 22.222C11.6911 22.222 13.1214 20.991 13.1214 18.6617V10.767H10.7357V18.6306C10.7357 19.7539 10.2752 20.1284 9.53803 20.1284C8.76983 20.1284 8.45253 19.6846 8.10064 19.0589L6.27676 20.3378H6.30778C6.83621 21.5341 7.91098 22.222 9.70503 22.222Z"
        fill="#fff"
      />
    </Icon>
  );
};

import Marquee from 'react-fast-marquee';

import { ITrustBarProps } from '@homework-task/interfaces/ITrustBar';

export const TrustBar = ({ images }: ITrustBarProps) => {
    return (
        <Marquee>
            {images && images.length
                ? images.map((image) => (
                      <img
                          width={100}
                          key={image}
                          src={image}
                          className="mx-10"
                      />
                  ))
                : null}
        </Marquee>
    );
};

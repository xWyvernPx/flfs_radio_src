
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    /* max-width: 1024px; */
    margin: auto;
`;

const Monitor = styled.div`
    background: #000;
    position: relative;
    border-top: 3px solid #888;
    margin: 5%;
    padding: 2% 2% 4% 2%;
    border-radius: 10px;
    border-bottom-left-radius: 50% 2%;
    border-bottom-right-radius: 50% 2%;
    transition: margin-right 1s;

    &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: 3%;
        left: 36%;
        height: .5%;
        width: 28%;
        background: #ddd;
        border-radius: 50%;
        box-shadow: 0 0 3px 0 white;
    }

    @media all and (min-width: 960px) {
        animation: tvflicker .5s infinite alternate;
    }

    @keyframes tvflicker {
        0%   { box-shadow: 0 0 100px 0 rgba(225,235,255,0.4); }
        100% { box-shadow: 0 0 60px 0 rgba(200,220,255,0.6); }
    }
`;

const MonitorScreen = styled.div`
    position: relative;
    background-color: #777;
    background-size: cover;
    background-position: top center;
    height: 0;
    padding-bottom: 56.25%;
    position: relative;
    overflow: hidden;
`;

const KaraokePlayer = ({children}) => {
    return (
        <Container>
            <Monitor>
                <MonitorScreen>
                    {children}
                </MonitorScreen>
            </Monitor>
        </Container>
    );
}

export default KaraokePlayer;
import React, { useState } from 'react';
import './SalesPage.scss';
// component
import CardComponent from '../../../components/CardComponent/CardComponent';
import NavbarComponent from '../../../components/NavbarComponent/NavbarComponent';

// 3rd party lib
import NumberFormat from 'react-number-format';
import { Container, Accordion, Card } from 'react-bootstrap';

interface SalesPageProps {}

type Props = SalesPageProps;
/**
 * Sales page that provide functionality for user to choose vehicle parts
 * @return {*}
 * @category Pages
 */
const SalesPage: React.FC<Props> = () => {
  let vehicleLengthArray: number[] = [15, 17, 21, 25];

  /* state */
  /**
   * Getting index of clicked vehicle length card to know which one is selected,
   * set to null because initially nothing is being selected
   * @function setLengthIndex
   **/
  const [lengthIndex, setLengthIndex] = useState<number | null>(null);
  const [bodyIndex, setBodyIndex] = useState<number | null>(null);
  const [makeIndex, setMakeIndex] = useState<number>(0);

  /** This is for when user clicks on a preview and it shows the content of the clicked card */
  type selectedMakeProps = {
    title: string;
    price: number;
    desc: string;
    img_link: string;
  };

  const [selectedMake, setSelectedMake] = useState<selectedMakeProps>({
    title: 'Isuzu 1',
    price: 150000,
    img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
    desc:
      'Isuzu Some quick example text to build on the card title and make up the bulk of the cards content.Some quick example text to build on the card title and make up the bulk of the cards content.',
  });

  /* ==================================================================================== */
  /* data */
  let cardObject = { title: '', desc: '', price: '', img_link: '' };
  type cardProps = typeof cardObject;
  let cardComponentArray: cardProps[] = [
    {
      title: 'Wooden Cargo',
      desc: '15ft x 10ft x 20ft',
      price: '100000',
      img_link: 'https://bcocloud.com/test/wp-content/uploads/2019/06/Isuzu-NPR81UKH-Canvas-Wooden-Cargo_13.jpg',
    },
    {
      title: 'Steel Cargo',
      desc: '15ft x 10ft x 20ft',
      price: '100000',
      img_link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQW3y3ApRa9G2rYhl5YwtpWWlhduXZgm-vFqg&usqp=CAU',
    },
    {
      title: 'Steel Tipper',
      desc: '15ft x 10ft x 20ft',
      price: '100000',
      img_link:
        'https://lh3.googleusercontent.com/proxy/PdkJNJdiztK6ndc-7EZAww5GLHBD13uEw7Y0MNr8Ew3fAUOOLgg1P3400TJkNKShG6OhoCypkH7Y38-ggbTHkPtmVvb5fdZwd79EGU3GkZGG4Ug0e97qodbCedHurAEl_ELON9tcPQaiOwoqhHCa',
    },
  ];

  type makesProps = {
    title: string;
    price: number;
    desc: string;
    /** The image link of the vehicles provided by different brands */
    img_link: string;
  };

  type brandProps = {
    name: string;
    /** The image link to logo of brands */
    logo_link: string;
    /** An array of makes */
    makes: makesProps[];
  };

  let brandArray: brandProps[] = [
    {
      name: 'Isuzu',
      logo_link: 'https://logos-download.com/wp-content/uploads/2016/04/Isuzu_logo_logotype.png',
      makes: [
        {
          title: 'Isuzu 1',
          price: 150000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Isuzu 1 Some quick example text to build on the card title and make up the bulk of the cards content.Some quick example text to build on the card title and make up the bulk of the cards content.',
        },
        {
          title: 'Isuzu 2',
          price: 5000,
          img_link: 'https://i.ytimg.com/vi/-RYLzWOp4Rs/maxresdefault.jpg',
          desc:
            'Isuzu 2 Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Isuzu 3',
          price: 40000,
          img_link: 'https://carused.jp/blog/wp-content/uploads/2020/03/isuzu-truck-cheap.jpg',
          desc:
            'Isuzu 3 Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
      ],
    },
    {
      name: 'Hino',
      logo_link:
        'https://lh3.googleusercontent.com/proxy/zEz16K6BIFFVGD7XEeHCXXzk_oXBmLst-3ESrktK8bmN3XoX_JSazObGgIH6ND4IRHtKyrECzn7SASDWLiR0G2AUAa39d-FSHCUsvu3ejEWzFWgqB0xTmFIkLw',
      makes: [
        {
          title: 'Hino 1',
          price: 1000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Hino Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Hino 2',
          price: 100000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Hino Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
      ],
    },
    {
      name: 'UD Trucks',
      logo_link:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAboAAAByCAMAAAAS5eTaAAABVlBMVEX///9LSkjSCQ9FREJIR0Wvrbj8/Pzw8PBBQD7VAACkpKPz8/P29vbBwMh+fXw+PTre3eLT0tjHxs67usLo5+xsa2o4NzTo6OhSUU9iYmC1s76HhoTf39/NzNLs6/DRAADFAADDAADQ0NB1dHOcnJvJ0tevrq2VlZTGxsXc4+bY2NiLiolaWVe5ubhhVVyYoaeaVVi9xMertLimqaymtLyirrR9foNqanBhXWXBCQ6MQUfE0tvT3+amZGe3AABmZWSkHyKSenyMXFygoKdaSU5+jJSbSEidOTm2HyCIkplyfIN1TFKhMDa9FhlpXGVwUVmBS1F7PkJpPkJRREiyMzawQkOQT1KiUFOkRUgtKyh6LjKMPzyVIyWjHBuKIiZsX2N+KiyBZ2tMMzyfCw5fQ0eISEqibWqRgIOzl5ShkZi0JSa6nZ1xWFSkfX7AIiSVhpFqMzifgH16bb6uAAAR3ElEQVR4nO2d+1ubyBrHUbKQCRi0aogVQyQJEBJMScytddVqrZfWtffae93tqavnbM/2///lzAAzQAQ16mrP0/ns86xlGGDgO+8771wgDEOhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoVwUnyppp2nrLpWk7piaL3E2XinI6omI2W43txuIAMKnVNBXxpstHiUcxW4324qLjVFyWfLwtx1lcbDdapnLTpaQMwCk2lA2JtlStVgsFXhBFkYPAPwJfkGEi0tCB8tkKdZ4/DjzUDRkbUk3wvCIn8HJVURSZFzylRKHgyuc4UD3+JktLIch6w3GtrYCCEU7WbKPT7fV+W3Dp9XrdjtHUZLRP5D35Gi35pktNYeRm27U3XkRuU691ewuP7m4+Xt3a7bvsbq0+3rz7aKHXrTWRqxSh8UHx2k0q3s0i2E0HGlwBekVOM7q/7d1d3R1VAVBHQ7jbu6t3937rGhrMCF3nUsVpNoWbLv3PjNZGwiGDk1vdhSeP+wCMJgJA//GThS7ylaIrXtu86fL/tAi+xTGM1enubfajthaHCtXb63UsLF6Txis3gtWEbZwMXaXVWXhyfLZuWL3jJwtIPEGGbV5bu+m7+BkxfV/JG70nW6f4yRjPufWkZ/BewOLYN30fPx0cdJbQ5BjG7u2tDiWcK97qXg9qJsCugtO66Vv5yeBa92ArJzJCrffunJ4yivpuoSa6Ld69Fh1duUawckr3wfHQJucb3taDrkK1u3aQcrCZM3uP5i8mHKL4qKcxIo+0u+n7+XmwPZtzek8v5Cwx6tOe6WlHY5VrQnNc5cz83Qs6Swx4mzddn+nQPsK1wC+6yln5p5dUDtld3nK1W6R98+ug5Y6gyL1nl/KWvnbPejIjFJaWmjd9V9cCd7MBmYZCFI7pPO+jRw8BgwOXIECNbIXSsezzzzsMh5q7BJeZ8dEjqULZT3YbSa5sGLXZbLZUKk1PT5dK2dla2daSZiYyp2OhPDY8YXBGfE49fE5Z8YmqgVOjqwFkTTey0ysz9frMzMo0PJlRzrjnsvFlI7lP3DQ8vmzUssH9weN1c9h6wDVdd9lkP4yC+a3jFy9eQrbCyvVf/0rYV0dfwT93fF4jHu7vbz5+sbVcdCX/wDZdl9mOL0gu7SLVI7vlN15yLusW6U2a9UlB0N+0JLH1cuxqivSp5NzKUJLCJ/ROycJSsDPkaWZzksub6PxHykvNhcorZGZYKY1PhQv4xq2rK5J/2dAp+BEvUWJl//g6PD6Ni8PiwowMu9THrLjuMv8WgHfNimYhlFrId4InpqLIslsrtXdguSFXq3CzGkJRLEtzWvcf9gEKVZDLrFbipxHYEZfUTFS6nJfMzqItzt8aIJXOlWJMLzYvQXKly7IJu1PSiOWdBmfJRaXLpwbKy5Vz6VTchVzppv1d6ZByde/MqRGv8Hb88SOp+rDStd3JOeN5H7x3BN7D3Au5TFCSedmDNz+ADybeisLzAm913gPoMg3oMqeq8a3dJaRD+9Mnux1DSwdrengrLQ8jnbAiJVwoQToOKyd5PqOcdHNDS6ctFWBfXMl/BPOG6CvH196H/OVyGSfzYmYZvFX4ZMTWJgAfodmJfGEptrUbSjr/GUOnRR597oR2Q0nHwn/k8/kR6LFwDnZmCOnEelAJUsjLeSAXGS8dt+Irx3rWbeaCw1ns1T2fmR9SumYBrUBppEfBU8U3OkH5VAzFjO91gSiTBWCPCEysDy0SwznWt9TR5w20aqUweVnp2Cy+jmkQ8aTBBo8NINYUJOWi0lnIO8DiylaGJWe0zi9djSielqaNjG7bpmnbtq5nDCVWupJ/QM6vyHU/AyuVYGzi40ZlpdJw0vEVQRQZsfsZLJc5wUPU34X95V1N9HcI/BqY/y/OJgi158+fP3jwYKFrWCSLeKCCz114SkFw4vp2Q0k3GyqoX3tH2NLAGWcJNfxcUkFaVotIF9KFn8GPORPOcqp0MrGZdCZ2OcegdFlfOclv+WXf3aamL738WKuK0Ogq6S3wERqPTyccYKoHwQ7lI9id5PAW3y26/YLi8offSSpnroJdtgLNTqzGecyLSseI2KRyVuLdzGJ5B3cQ6cK1SfEfK5sNZzlVugw2unRC32dAullfKeLmNSlcXS6Fg9bFMq0vqnrAYeRP4b75/KGIdzD2H+C9RURSSD51/jlO5oQ1oH5pod4q58Rc8MLSMbr/2NLlxLvBj58drNKx0hFZpsNZTpWOKGMklCAqXQ0rR7ogJra6+qXXYDloQIDrQH/ZZLBAZmQo83idIdKV58HTQEjzCckHVmvk8NY8+LzDofNerXQ8vut84t0MKZ3/nFMrHHM+6fgRbHRJ4wMR6XAwKQUmhq0OBrb25UZiuDn0f35lFawGbqj1ITySshnqnx1A4wy2mpuBxPM9UhDtD/Ch6z4iLaZmXVw6DrdNucR7/qelIy1VPakEYeky2OZCJsoHXQupHt9cnhPLrT3j9WXwVPDNBtpgeM4OrCnEnoR3YD7krYzjUIv4iNRD4S3o191wi49plS4uHXm4J2LMEzn+KYeJbcZrHeMISadjm6uFMwQhKjQ8afbib9toPBpAreRVEDR1fKSpUw954iGt9+APk7hPrtMPKfyUKMw9AupIBTV2YkxbfgnpDCxd4ozScNKRMGU2nOU06WwcZCQ2t4F0OK8UvYlwxxBeOjd90bWrmoAkcZ4DUGJI9LEWlq6/TuJLzt4Fm3Ig8UF4tOydRRQ+gHEKakNFMaZYl5CuPBBon2Qo6bhpXBUiXb9TpcORUnTwPASWboQY6GBfZmA4hpXq+oUaPVMQkXRfgJplcMfM+lcoSlFf2KTLxtSKYI0PegpPwvk2LZzOHBbBM0+6mDjlEtJlrkg6AY0lWJk8Tkvz4SynSYeDXClxFQCRjgzfnGzPyunIiGpKYssXmN10eKidK90s54+HCFqkQ/5qjoyUCP8BgGSD+fbD+fbxWAzPHRXBIyidKPBXa3VXIx1XQiNYkkTGgKVyJMsVSUckHLQ6dLfZXHQ4PM3WhhbPKfCoRw5bp6xY8JmISHcwjtMLyjuwrJMt3g533MFrGe8QsXR84Wqt7mocppaLjttL2WiWK5IuT2pGXBdQrqWkSDHYXHlIt2lOoWmDiT3Y1vFTPhPhbt38EU6eKqBpA61ANjORQPSrjHeIhyrYq7jv/1xxW3clYYocampSrESarWGkO7utS1nkMvE68/pIVDypPtxbblp1iheZ6icADohE4+E27LhF0qcyy+DdeLB5GO64q38GEh8A8KnKiPxU3EjYJaSrYekSR8LO1daFwvN6NpiZ/qcizOSRO3NGikSb+aGcpubOkPOdIvjXOCEUOYL9W0H6fRWsFYLNtbB0fZukT70CaqngzpRfrXSkX5dYPc8lHUfCc9aOyXKufl20YCFC/boaGTgZSSqwFmn00rWEbLEoTnVKYERjGbw3ybM3gikf8DWQClrj/FGwNbcZCUQtsmNiEywbIiNMLd0bvkvulv6M0RQp8XbOF2HKJIYIu96zpHMfV24ktBVHeDRlmlSRmcR2TKkFE4enDBPF0YZmxzH6Y7CcGZ/wcVaJ2RWPJgjmR7CrB5t2aCxlFPxJjh6f7IMXuru0KG55Cq6J0bUpuGVg3Tb9jDHMlcS7OWe/TonzZXjWIRcxEXEkfFGexI3nGcMUSKiSThx9gecsE8NLbsTjaN1bQotnoY+7PzHnE/KYu7+Q1LnWB/B4jGxNhKMUdVcj+SaOVPAKLaQdj12/TibJIpWbNCJu+x8vnX32fMl5u+RkqjqVIhoYsS2pjEdcStHSJ5UhMvyMjTQyAH0SEtEkh85xoCXrAjN+vwg2x25hHNw9UF8GiXOH87CTRzYnvodaxOK/J4J8D2E1UKC/rMQuXydPKFJM4q3cehcrHYfdXC553O/coykkhkixODaIrxkDgYlB5usSQo/opI8ZmPdpquAZ4uGksxbvVXlGPDpWi4dzYz5zk6+WVXd55a9jhLn/qOr9W8Hmr2QN5vyLP8mhY7cyffX4SGAK1XuLcbeHK3xk8J1Uz5TrRmNnyUtJs+Qhzj8QVsYPlcWLefCIZiqyRIS0r9pAQdn4OZuBqdZyoF1yhSNWd8okcgxC+97SlMjYUIj9X8YmfaB4R399hRyRpMnJp6C4HWzO3V/zODhsjd0Kck2+BuCOzYjVyr1G3Bw+RxZnlEgsrGGD8gc2grUp3pC2oJi1gZUk8QwxhjmL7Ydd8TUgdWOa+HIOr08gFa0UNEwj2YxtmhrCRF+/c13v4AIHvDQF1gjv0nrNyOi6jda0uNiZ0CmH65XrrtkpR/1R9eB2iEnkKsfGgoT192BrPdgcm4T/uWY2Nhk+7Egd7R8pDA+NLn41H5lsZKVZHd65mZnG4xs4diErwthcTpJykNCKsMTeMDOUdEH8l/bNmFgUyxqmIsuKViYjkXhREMOPBP1oFq8H85bexq4IE+sksnGnlphZCa0DCx0XDGgmTr0nYLWdyhQn2nfAaP/wl9u/JHG7tgvt8ixuG99GwWtd5KYqTjvBPGwyEuXdOxlMTGGnkrwOM5U7dU3HMNKJwVCV358yg4KhJxoqWeiqSioI5iMkrMOU09HL1Nj4w1GXfNiZ18bivSWesY52Yb/6YD1RvNsl2CFPVtbNcnv9/jdYA8oWwy/dW2wkXdEcib37YCQoafUzK62c3hoMNekT6t751V1LxT5XVgpbulhLD7X6WQvCTHSaJOlSUn3oEWirsVipipz9VUUR5UFnex3qd3vyBAdA/e8YTI/ZNQklXV/f7nx6WFRH1a82B1u6xUZyJ4WvQQ8YuX00mJghnp7LBev58aL+tJRL1c7q92T9VwukE9LhlxjCj8fK4cWab3xt+NkTi8pTbG56oL7ImXoOWuVAET2fuuJfKPTOQYZcBoWZs+lUdPU16qGw6VzqIrN2DegyCwyvo9ERFSx/+Pz272fPfv/9y5cHLgv+V90egt3uQgRv/5ffIX///fbz6q77HtBLnWcK0F0mGh1C0Ev5tOS/WoHeBMmGX3PhpkvTKysrMz7oVRpDN88xOpvJ+gw+hjLeEfFJZgknl7A6cnnG9ZbkfZK6EWfovKnXSjP1ej6fr0PcIrre3sBnjLt4tiQymWl0GGpQ3RYvDZu6fL2UudirpMr2ouNGKrteT03137qCFBHzHsXR0fl+vz9PcHcW/be6yFfEdsswRllyFjfOWnUhKpqtu28umdYP9WU42bLLRm0WvTilJ74Z5uGtChgaTkQruv2Xv2T+EotpdddlMtb3S3wCgIycfbcY113SLwFcB9x229VO+148W5szlPtLYzik3Ab9/sa1oGy4PQTG/OuS2hX/MhlOhg3dme6SckWYSDuZg3bXv8T75Gr/u+YrR7+ueG3YvnbW928X/ooD2EXKob74xmkjHpQrRkfawfZOLm9e0O7Ul2UZRShUuevG005gRPtr/wKGB/pfbYERqpVmgyp33dg7jWYFTZlbxr46pHhA3T+CPdfCktNs7NCPTF072k7Dc5qiefhyGPGA+vLQFJHJOe3tHfqJqRtA7my3m5VxWWR4+/t+8ZzigeLmd5uHkSUyuY3ODzUw8hPR2tlGhgdDTcE07hyfbXpAPb5jmFC4AmzloMld/jVbygVROhsN9CXhAnSbln7/znEx+Wv5ABSP79zXLZhVRr4SmtxQE/SUK8bc2UC/52Ohz4YJWqZ28HC1jwaYVfwVMNXb6q8+XKtlNAGt2rPQ7/ps0PjkpuF0JB40vXGkHiebupE9WHu4+Xj1eOvbt63j1cebD18duLMwHNJtvOI0242dnYu9JUa5Uji7tLPtqmd5vxAj8opm2nqmbKAPyNmmpqD3gzhBrlqubts7JZv+CuEPgmXseOo5FWh96JfQgl/45ERRKExB1SqOp9tO7Gwk5aaAIWZ3ZwPJB/Vz5tAPRVrW+LhlWd5vRjpNJNvGTtcw6a8w/XhYemdnB+nXaLShhJh2GyZA1XZ2OjrtgP+wiIrZMjrdbhdp6AL/ATc7Rob+yu7/AZz/89YuJoxSxBv+5jGFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKh/NT8D6r4mqWabvpTAAAAAElFTkSuQmCC',

      makes: [
        {
          title: 'UD Trucks 1',
          price: 5000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'UD Trucks Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'UD Trucks 2',
          price: 900000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'UD Trucks Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'UD Trucks 3',
          price: 50000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'UD Trucks Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'UD Trucks 4',
          price: 15000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'UD Trucks Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
      ],
    },
    {
      name: 'Volvo',
      logo_link: 'https://www.saferresearch.com/sites/safer.cloud.chalmers.se/files/2017-06/volvo_1.png',
      makes: [
        {
          title: 'Volvo 1',
          price: 805060,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Volvo Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
      ],
    },
    {
      name: 'Daihatsu',
      logo_link: 'https://logos-download.com/wp-content/uploads/2016/04/Daihatsu_logo_logotype_emblem.png',
      makes: [
        {
          title: 'Daihatsu 1',
          price: 25000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Daihatsu Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Daihatsu 1',
          price: 25000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Daihatsu Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Daihatsu 2',
          price: 2500000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Daihatsu Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Daihatsu 3',
          price: 905000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Daihatsu Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Daihatsu 4',
          price: 10505,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Daihatsu Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Daihatsu 5',
          price: 200,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Daihatsu Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
      ],
    },
    {
      name: 'Mitsubishi-Fuso',
      logo_link: 'https://commonmedia.asicentral.com/2360000/2360765/NEW%20FUSO%20logo.png',
      makes: [
        {
          title: 'Mitsubishi 1',
          price: 2000000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Mitsubishi Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Mitsubishi 2',
          price: 10000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Mitsubishi Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Mitsubishi 3',
          price: 8000000000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Mitsubishi Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Mitsubishi 4',
          price: 6950654650,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Mitsubishi Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
      ],
    },
    {
      name: 'Hicom',
      logo_link: 'https://seeklogo.com/images/H/hicom-logo-96B2D933ED-seeklogo.com.png',
      makes: [
        {
          title: 'Hicom 1',
          price: 1500,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Hicom Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Hicom 2',
          price: 5000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Hicom Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
      ],
    },
    {
      name: 'Toyota',
      logo_link: 'https://logos-download.com/wp-content/uploads/2016/02/Toyota_logo_1.png',
      makes: [
        {
          title: 'Toyota 1',
          price: 1,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Toyota Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Toyota 2',
          price: 1000,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Toyota Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
        {
          title: 'Toyota 3',
          price: 10800,
          img_link: 'https://nicholastrucksales.com/wp-content/uploads/2019/01/post10.jpg',
          desc:
            'Toyota Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi',
        },
      ],
    },
  ];

  return (
    <div>
      <NavbarComponent />
      <Container>
        <div className="sales__outerdiv">
          <section className="sales__section sales__section-length">
            <div className="sales__section-header">Length</div>
            <div className="sales__section-desc">Choose the length of the cargo body</div>
            <div className="sales__length-div">
              {vehicleLengthArray.map((vehicleLength, index) => {
                return (
                  <div
                    key={index}
                    className={`sales__length-card ${lengthIndex === index ? 'active' : ''}`}
                    onClick={() => setLengthIndex(index)}
                  >
                    <div className="sales__overlay" style={{ display: lengthIndex === index ? 'flex' : 'none' }}>
                      <i className="fas fa-check-circle"></i>
                    </div>
                    {vehicleLength}ft
                  </div>
                );
              })}
            </div>
          </section>
          <section className="sales__section sales__section-body">
            <div className="sales__section-header">Body</div>
            <div className="sales__section-desc">Choose the material type of the cargo body</div>
            <div className="sales__body-div">
              {cardComponentArray.map((card, index) => {
                return (
                  <CardComponent
                    key={index}
                    title={card.title}
                    desc={card.desc}
                    price={card.price}
                    img_link={card.img_link}
                    index={index}
                    bodyIndex={bodyIndex}
                    setBodyIndex={setBodyIndex}
                  />
                );
              })}
            </div>
          </section>
          <section className="sales__section sales__section-brand">
            <div className="sales__section-header">Brand</div>
            <div className="sales__section-desc">Choose a brand that you prefer</div>

            <Accordion defaultActiveKey="0">
              {brandArray.map((brand, index) => {
                return (
                  <React.Fragment key={index}>
                    <Card>
                      <Accordion.Toggle
                        onClick={() => {
                          setSelectedMake(brand.makes[0]); // reset the content
                          setMakeIndex(0); //reset the index when user click the accordion
                        }}
                        className="sales__brand-toggle"
                        as={Card.Header}
                        eventKey={`${index}`}
                      >
                        {brand.name}
                        <img alt="isuzu" width="100" height="30" className="sales__brand-logo" src={brand.logo_link} />
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={`${index}`}>
                        <Card.Body>
                          {/* The left column for user to preview and select */}
                          <div className="sales__brand-makes-div">
                            <div className="sales__brand-makes-picker">
                              {/* loop the makes array */}
                              {brand.makes.map((make, index) => {
                                return (
                                  <Card
                                    key={index}
                                    className={`sales__card-picker ${makeIndex === index ? 'active' : ''}`}
                                    onClick={() => {
                                      setSelectedMake(make); //select the content of the preview card
                                      setMakeIndex(index); //setting the selected index of make
                                    }}
                                  >
                                    <div
                                      className="sales__overlay"
                                      style={{ display: makeIndex === index ? 'flex' : 'none' }}
                                    >
                                      <i className="fas fa-check-circle"></i>
                                    </div>
                                    <Card.Img variant="top" src={make.img_link} />
                                    <Card.Body className="sales__card-picker-body">
                                      <Card.Title className="sales__card-picker-title">{make.title}</Card.Title>
                                    </Card.Body>
                                  </Card>
                                );
                              })}
                            </div>

                            {/* The right column for user to view */}
                            <div className="sales__brand-makes-viewer">
                              <Card className="sales__card-viewer">
                                <Card.Img variant="top" src={selectedMake.img_link} />
                                <Card.Body>
                                  <Card.Title>{selectedMake.title}</Card.Title>
                                  <Card.Text>{selectedMake.desc}</Card.Text>
                                  <div className="card__price-div">
                                    <p className="card-text card__price">
                                      RM
                                      <NumberFormat
                                        value={selectedMake.price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                      />
                                    </p>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </React.Fragment>
                );
              })}
            </Accordion>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default SalesPage;

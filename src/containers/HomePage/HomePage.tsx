import React, { useEffect } from 'react';
import './HomePage.scss';
// component
import Container from 'src/components/CustomContainer/CustomContainer';
import NavbarComponent from 'src/components/NavbarComponent/NavbarComponent';
// image
// import transparent_background_truck_img from 'src/img/truck.png';
import transparent_green_hino from 'src/img/greenhino.png';
// 3rd party lib
import gsap from 'gsap';
// import { TweenMax, Linear } from 'gsap';
import { Parallax } from 'react-scroll-parallax';
import ScrollAnimation from 'react-animate-on-scroll';
import { Button, Card } from 'antd';

const { Meta } = Card;
/**
 * Home page of the website
 * @return {*}
 * @category Pages
 */
function HomePage() {
  // let imageElement = useRef(null);

  // useEffect(() => {
  //   TweenMax.from(imageElement, 8, {
  //     repeat: -1,
  //     yoyo: true,
  //     transform: 'translateX(-3rem) translateY(-2.5rem)',
  //     ease: Linear.easeInOut,
  //   });
  //   TweenMax.to(imageElement, 8, {
  //     repeat: -1,
  //     yoyo: true,
  //     transform: 'translateX(-6rem) translateY(-1rem)',
  //     ease: Linear.easeInOut,
  //   });
  // }, []);

  useEffect(() => {
    gsap.to('.homepage__button', {
      x: '0',
      opacity: 1,
      duration: 0.5,
      stagger: { amount: 0.35, ease: 'none' },
    });
  }, []);

  // const scaleup = () => {
  //   TweenMax.to(imageElement, 1, { scale: 1.03 });
  // };
  // const scaledown = () => {
  //   TweenMax.to(imageElement, 1, { scale: 1 });
  // };

  return (
    <div>
      <NavbarComponent activePage="home" />
      <section className="homepage__overlay-parent">
        <div className="homepage__overlay">
          <div className="homepage__title-div">
            <h1 className="homepage__title">
              SOON SENG MOTORS
              <br />
              ENTERPRISE (1988)
            </h1>
            <div className="homepage__button-outerdiv">
              <div className="homepage__button-div">
                <Button className="homepage__button" type="default">
                  Sales
                </Button>
                <div className="homepage__button-description">Some short description about sales</div>
              </div>
              <div className="homepage__button-div">
                <Button className="homepage__button" type="default">
                  Service
                </Button>
                <div className="homepage__button-description">Some short description about service</div>
              </div>
              <div className="homepage__button-div">
                <Button className="homepage__button" type="default">
                  Sparepart
                </Button>
                <div className="homepage__button-description">Some short description about sparepart</div>
              </div>
              <div className="homepage__button-div">
                <Button className="homepage__button" type="default">
                  Insurance
                </Button>
                <div className="homepage__button-description">Some short description about insurance</div>
              </div>
            </div>
          </div>
        </div>
        <div className="homepage__background-outerdiv">
          {/* <div className="homepage__background-image"></div> */}
          <Parallax className="homepage__third-img-div" x={['-10px', '100px']} tagOuter="figure">
            <img
              className="homepage__background-parallax"
              src="https://s29755.pcdn.co/wp-content/uploads/2019/08/2019_Top_Five_Class_5-Mack.jpg"
              alt="logo"
            />
          </Parallax>
        </div>
      </section>

      <Container>
        <section className="homepage__section-motto">
          <div className="homepage__motto-title">Our Motto</div>
          <div className="homepage__motto-top">
            <div>
              <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                <Card
                  style={{ width: 240 }}
                  cover={
                    <img
                      height="130"
                      alt="safety"
                      style={{ objectFit: 'cover' }}
                      src="https://isqua.org/media/k2/items/cache/cf4507ae4969876df39b5f798b6f40ce_XL.jpg"
                    />
                  }
                >
                  <Meta title="Safety" description="Keep you out of hospital" />
                </Card>
              </ScrollAnimation>
            </div>
            <div>
              <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                <Card
                  style={{ width: 240 }}
                  cover={
                    <img
                      height="130"
                      alt="performance"
                      style={{ objectFit: 'cover' }}
                      src="data:image/jpeg;base64,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"
                    />
                  }
                >
                  <Meta title="Performance" description="Keep you high all the time" />
                </Card>
              </ScrollAnimation>
            </div>
            <div>
              <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                <Card
                  style={{ width: 240 }}
                  cover={
                    <img
                      height="130"
                      alt="Efficiency"
                      style={{ objectFit: 'cover' }}
                      src="data:image/jpeg;base64,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"
                    />
                  }
                >
                  <Meta title="Efficiency" description="Keep you working on coffee" />
                </Card>
              </ScrollAnimation>
            </div>
          </div>

          <div className="homepage__motto-bottom">
            <div>
              <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                <Card
                  style={{ width: 240 }}
                  cover={
                    <img
                      height="130"
                      alt="Comfort"
                      style={{ objectFit: 'cover' }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROCXM7wgkd18fPklNdrVG2k6_YcdGj0Rkdew&usqp=CAU"
                    />
                  }
                >
                  <Meta title="Comfort" description="Keep you comfort so you stay" />
                </Card>
              </ScrollAnimation>
            </div>
            <div>
              <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
                <Card
                  style={{ width: 240 }}
                  cover={
                    <img
                      height="130"
                      alt="green"
                      style={{ objectFit: 'cover' }}
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFhUXGBcXFxcXGBcZGBcYGBcXFxcYFxcaHSggGBolHRgVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyYtLS0uKy8tLS0tLS0tLS0vLy0tLS0tLS0tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLf/AABEIAKIBNwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAECAwUGBwj/xABAEAABAwIEAwUECAUEAQUAAAABAAIRAyEEEjFBBVFhEyJxgZEGMqGxFEJSYpLB0fAjU3KC4TNDovEHFRZzsrT/xAAaAQACAwEBAAAAAAAAAAAAAAABAgADBAUG/8QAMxEAAgIBAgMGBAUEAwAAAAAAAAECEQMhMQQSQRNRYXGB8DKRocEiQrHR4QUUM1IjU/H/2gAMAwEAAhEDEQA/APLJTgqKQVBUSBU2uTdmToCnFI/u/wAkG0AtafFWAKtkdfQpOqch6yk5hbLgArA1DCq7/oJ8xQtkCIVrAg2uPVWtqOOiV2BhN1MEoZoM6K9oSNiscKxoUWtmyuIDeZKVsGpS5pzAwixMqMyAVMDSBKVslk6Zg2RFN9/gqGdQr2NSMgTmCm2DshSQCp50qQUXwrKb1W0qYg+Klgs0MO9FU33WbTMIqnXukYyNeg9G03rGo4hFUqpUsY1mPV7KizqdRXNqJkyGi16sD0A2orW1EbCGtqKwVEEKimHo2EMD0/aIQVFLOoQK7RN2iFzpZ1CWE9oomoqA5PBSuSRCwvSUISS86IfNwomJUmPA0APjr8U/ZDkFJtEHZdJ67jUN2h2n4EJuxJ+qfQBXDBA6Si8HgYOpnl+qrlOMUCjO+iO+yfUKYwbvsn1C6H6KRrAQ1LGUs0ExyOypXEN7IhlDBn7LvUKxuF0u6/SfWF0lE03aOb6haVGkOionxrjuiUcxTwcAWJ63U6bQefoV1gpgbBX08vILI+M719ROzTOTNAclW9gBuPmu6bSHIfvqpfRmfZHoFXH+ocu6+oOzOB7QbR6pB0/9hdzV4RSdqxp8h+Sw+K8JoNBLS0HZus9Imy0YuOhkdUwchhggKwVYRJ4I8iQ0EdHEHzDgq3cOe33qVQeQI9YhalkxvqTkI/SE7cSNEhTbyf8AhUgG83D+1NoTlHFS36qbHhM0NO7j/aFa1n3X+gH5IcyRCdK/VX0+seoVTWn7B83IhjOjB4qtzSFsva79hWkHWFWwj7XoFcykq+0SJzITKiJp14VJw1tUOCRZNFqWwU0zcoYiUUyqsKjVsjsNXtcojI1W1FZ2iA7WFZTdOilhDm1VYKqFY0ohsBI8qRLLWvVgcqpJVjWKt5yFmYKD8RGifsuqY0mC5+KXtUGiTMQOasLzsEGeINHutEc9AqxxQkwAI57KW+4JoFh8EkEcWTp8UkvNIh4CzMeXoQimgCJPzVFSrBCVc5xLSJXZdsY0XYgAd1BYXiZY4mEGK7m6hS7ZjtR6JViSu1ZDUrcTbUBBkT+9kAcNPuPB+BQ/ZN2dHil2LtiD++qaMFH4dCFpw1QbekKdKpUbpnb4FwVLRUGk+R/QqxteoPtJnr3BDqfGKw/3H/iH5hXj2grjSofwsWc3GVP+wD+SubjXc/8Ag3/CqeKD/KvfoQPZ7TYj+Z/xbKmfaGuf9x/llb8gs9nEnjZp8WtVzeLVNjHhlHLoq3gj0gvfoALGKxNS38V3iXR8IR2A4NiHR3AzrIB+EuKy/wD1WqR/qx/cfyUhxB/88fieklDJVRSXo2A7fDUxh2HtHN/EB8HAX/VSHHqIFs3m35kWC4htZhP8Sv6Mk+q0MNXwTbl73nq0nflYLBPgo7ztvwTBR0eHxLKv+2DvIbPxIU6vC6Z+o8Xjuuy7E7ujbks2n7R4cWbni2jYG3VWj2kpE+7VNj9X/P7lZ3izp/gi0vUWgp3A27GqPFwI+DgqzweLiT4uI/NUt9qWAxlq/hH6q3/3BMgUqsf0RMa7+XmmX92t0BxHPB3D/bB8HE/knGAcP9uPNv6qdP2iabClWn+norB7RUxM06rY5tt80HPiesffzA4EBh3D6p22nfmFaKD+XqfylIe0WHMd48zINo8ucI2jxSi7So31j9FVLLmjvB/UTswYYSpGhPorGYN595vy/VHjK7Qg+F1IWsq/72XcHlRmU+FuJiwHiEY3hYbGZ4Hif0COw1JzibWgXOk39drJ+J9jTpk1SAPtHX+2N+gXRwdtlXM9EOkL6GG2MehPxKsp0QOcdSbrjcJ7ZBr8hbmozY/XaNiLxH3fkulfjm5G1Gva9jvdfeCfs9HfdN1Vnx5YPvQXGjSEDZOKnKB++iz8JxBjrZhI1BP7lLH4g5CAf8+az3Lm5WQ1WiP+ki4c1ybeOvYYdPnPwO6OwvGi+/ZOPVt1bLFkjqE162La0w63Lqp9u06EH0WPisWTY0XnpayAFF0zlLN4JMwPgmjFNaugWH4xxLoFgOX6KFGG7zF7c9FRUxDRYGZ35p8OWAESJibfBXK6IHGqBr4wkgH3ubWEJIpIJ45UeDZ3qqyw7GfmqxWKXaDey7iTQ+pZ27hr8bqJqNOrfSyk13Jyl4gFDQNkQGc3D4qTWDZ480gwbt9Cl2bfvD0KlktFrKTtnN9SrA2r1PmhuyH2j5tUhT++PiEGiBIdU+yUnPqGxafT9FQ3ONHj8SsDqn2/+SWvIlEhTd/LHoVNtN4/2x+FVg1Ptj8ScGp/MH4ipr4ELw2p/KH4Vc2nW/lj8Lf1QeZ/80fiKkM380fiKVryAHBtf7I9G/qrWsxHQeTVnBh/nN9SpNw4/nM+KRry+RDUazE8/l+Sm04saE/D81mtwx/mt9SrWYSrtVb+I/qkaXh8gGiK+LGxJ/pb6KxvEsWLxPi0fks4YXEjRx8n/wCVa2ri27uPofmFW4wf+rAatPjuIGtIH+136K9ntQ4e9R/5fqsqlxvEN94SOrPzCKoe0TTZ9Jp8DBHqs8uGX/Wn5MFGi32iouHfpH0kecqbMXgX/Va3a7QB0vso4Z2Fq6ANO0gD05qyvwKmZ1+f6hZmsUXTUo+oLLH8Hpu71F+U7FjjGmlyfy1Qzq+LoT3u1byP6aoQ8Pq0jNMnymPw/p6KTeN1D3HU8x6WPodE8ccpbNTXjuRah2B9q3Mc4wAYu1xOWdvD/PmuY4vxOrWeX1HkuggD6rWnZo2m/wA7ytPE4ZrmEuc7N9ggS3zFyemix34cXnMQRfmLk2+Hot/DqEVS2HjSBSQYExcf5WrwvjL6BOWHU3Wex12uANpA0I2IuDoUFgsGyQTdp1nbYSF0FPgggGPDUcpMJs2aEPiI5IAZjnPcRTBue6JkgbCRC024evE5/Qk/v4ql+BFEte3b57I08fp4dmYgOe892mYMAgQ6DsTN/CFQ3LK12SXqCMXN1FAFdtUe8ZG/7hH8J4k4OkGI1aPdIGpjQFaXadrRZUyNaXDMQ2Yg+7rM92PNYGJp9m8Obp+fgqFNTbhJK0K006O9w+IFRstP5x6ITikxYHxiPis3g5cO97rTfLfXmi+IVZbofC/5Bc/l5MtLUFmLVqEujy1nxRuFwuU53O6x+9lnYam4y5umoJ28/CfRH4VrnWjmDfS2ny9V0pulSZC6vWAcb2tJmT4/GEk9Hh9iSAO99YE2vAM7/wCElneSCDZ40ag3Cbu802YcilbmvRFgsg5hP2Z/ZSFPqE4pFSyWPld1Uhm6psp6p+91QISFRymK55BV5nfsKQqHohRKJ9v90eqXb/dCj2v3QpCt91CvAFeA4xH3Qp/SPuhMMQPsJxXH2EK8AehL6UfshTbjD9kKDazfslTFenu0/BK0v9QV4FrcWN2eisbjGbsKoFSkdiFczD0zo/4kKtqPVMVpdUy1taieY8lYKdE6OHn/AJVH0CdDPxVbsE4fuEtRe0mDR7M0Bg/suPkVbT7ZvuunxuslmZpm7fiFp4XiGz7dQq5xml3kfMvEPw+PItUpz/TH/S02YalVbIaCPKfPkgabARIghOxjmEOZr+7bLHLle2jFU11JV+AkXpujoTb4KzhnF30TkeJG4Pp3T+/yRGG4mXHK45T4WN+WyuxeBZUEOPgRGvlqEjyv4MytD2bGHNOsM1M+IOseHr6LL4xgw4RJB2I/P0WLSqVcPUFyORGjhsCuhdXFVodG1+cqiWJ4ZqcXaA6WpgYDCEPLXkiGlwhubNFsoAO+3yWliOHMNPOwkmYu0NBBBIIAJ5HfSLXCfE4htJjnutDbOJAykkTc8xI8yhMJx4VHgPIYbgNaHZHT3s/JpHugE3mx1noQcskbSLYx5otmZiMNlOZum4XQ+znEMwFN2m28Tt8UPi8KRMga8wUJgnljw0MYZMtMQRF9QRPnKplJZoOLKVLoHYfibMXUq0KVEk0wbl7AHEOLYIdGTT3pMbwuP9pOHV6Za+rAcSWgB7XFkaWbYiBa56rsuOYc0s9SjTFN1QMbVfuXFkFxk6TNrCSCZ34DjhJeMtR1V0Emb6Al0AW90AkhdTgIY4w5se3nfQ1pRS03O/8AZbiwr0ixzWtdThttC0ju22iIPgia+CEiYIJOl9Lm65X/AMeU35nPIHZ5CAbiXZmnujcCCJ/yu5o4jvQGiZi9yd9unLWPXjcbHss8lj238jPPcemx1rWN7RYJYihBAJDT+ew5BTrY4lktbpAAMyJBIJ62jpJUKlYkA2dA+IDTII8o8FiUZXYoQKVMQQCOhmx0ubz+Sd2HGwDZEDSdReP3oFSA0G494d0nYG5nYGx8VW6oKtMmmYMnY9D6E5JRp76kLazX7Ta2ve1ImT0HxPKElLt8kO1mQNddXDmmS87WyBzHhufolLUxplKCvYaGjQmGt5pwwc1AJwgSi0MPP4qYa5UgBOPEoUCi7M5MXu5BQDzzUxVPMIUCh+0+6Eg/7qTax6fBOK5+yEK8CV4Dio37JUg9nIpCv91TZUYdQQlfkD0Hb2Z5hTbSYdHKbcM12hTuwKTmXexeZd430I8z81A4Y8vyUxRc3Q+hRFHEHR4kc9wg5SW2pLfQFpOc02JHj+qPoY3Z489kQ/DgiRcFCVMPFx6KtyhPcDcZbh7qQPgULVww2/wi8BTJab2GnmrKlNZ1NwlVlVuLAsDVcxwgkCbjcTaQup7LNvI1uP1XNuZ3h1kfCfyXStd0Kp4p3UluGbumB4nDZpEHS3+VtcIZnoh1z8dOg8kLO3ndX+ztSKRn3QYA5xa45G3xWPLJvE/BoEHui7iAwlNjRiHTIBykHKJJt3XB2ax0O19QodrRc3NRAyk6MdmA7rDpqLlw8lzHGuKUq9doZUnLlF4y2JkM2JkgnmIgWMl8Jx9LvMY8OBd3SIhsgQD6TItJgwTC3S4eS4emndW/DU1SUVFrrSMn2iipUewGHMayziS3vS4xFwfd6WWNSoikxz7HKJAaTGomZ6TaN9Vq+1XD+yqGsHWqANc07FoAEHlANv1tz9XFSxwgnSw1IkTFjeOi6fDS/wCOPI9NP5+o0K5Tv/Z3iJrUO9BLDlmdRANzzEgeQhbPCOG97tHRA93eXdN7fmgPYn2eNCmDUfJcQ8gAxNhbcC1zvC6R+IDYJ7x7xgTYTFydBp4SBfVee4zKu1ksWzf/AKZ5fFZie2vZtwz8/wBaANDcQ4W8v3ZeWYYZKzZtdwdOkR0tEwuo/wDIOKq1XsZTY5zAHEw2T33jKY5kM+PVcWHOi8kAHciIuQu3/TMThw9N7/Q0YvhO59iAG56RkOaZb9YQ4EEEiLNcHOkGSAI5LqcoD3jLqQ2YcdBB721hOt7aLivYDD1DXdmLg3sZNz9sFg15Z16NiMzR3AMxgBpdA1Anlz/yudx7Uc7S6lWRfi0K2sb3XPkkX70H3ZaZ5m9/DooYCv3IaDmb73ORInzHw8EIW1SQGACJIz8oaRFrHvOsRs48p0vo4ZcEe90gNIED5H1KwTpb9StgtGhUNME5ZdIMD6ugiBEX8xIvKm/FNpyMpy3zToGzByjzaEBjuIPpuDS10EgB1zB0bMcyDfaUqPF2uYWQMxBMkG5kR4e87RP2c5K2tPD30JqEVMZINRwBDCQRfWcpHlLR6+bIKAR3iAQ4+9fMIiRaMxhrj/UUk6xw6oU8qFUpxVKoD0sy9RymqkEit0UhVHJDB5VgqJeUFIuDmpd3mqc/RWtcPshCiUSFIbFSFE81WQNrJxUI0KmvQlMkaBS7IqynieYRTCDokc5LcVyaAezPJSCPyBLsfBL2veDtANp8kbhMSW63CqfheSngqZLo/fRCTjJBbjJGoGjlZRqUAdvNWtEQOXik82/fgFiTd6Ge+4twFM9mepsPmo1Wo4UO6A0WA9f3dZ+Ns0+CrUuaRHqzU4TTPZwJvJPn+aWNpjp5fu6XCAcpvaSI9PVPxGd48jP5KmV9qwSWrMxpl7dY5+g/NdHTpAiTI8tP2VzdNpNQDpb1BXT0qzWSCM1xsT8bKcTdRoj2QS3CtLZNRjDFiQ4ggTmMtaYgCfNYeKxHZ4Oqcw7zSMwnKM5ytIJAJALpHksj2nqmnWfDy4EAxLhGa7WkSRZuWOQgWhamN4fUqYEh5aAKedsEEhomq0ddCT/UNIWl8PjxxhK9G4vX9jV2UYxT62cE2gTcOaRrIdb9/orOFcR7Gt2nvFosBcHeCeVkJToMLJOoEnqJgnx0UaFPPam0kgg63glrfCJI9V3XWzLTuf8AyBBo0Idd0vj7oYPjD/kuGbTPP9yuq45QLKWEZVaczGOGf6rm91oG3dgBs9RtC5ujgi50NBMQT0AAKx8JFY8SV9+vqyuDpUeq8CruqYag4kgimLz3XOIjXa7S46xy0RNTFAO72YmQ0i4A1eXGehmfuFZnAi2nhWMdl7oDQ43IkkgxEamyE45xchvdIuHGRF2EmBbUw6/guG8LnlaS0tlLTsv4jiGZW5GSbS+JINjc73BO406g42B4a0vkNkZiQ2AdT7v4Y5kwVVTqS8t2dfckQ6JJ1306rsPZvhxa1zTBAc3wkOMkE21tG1/AaJz/ALfHoxk6QPhqLgxtQNIBpnQSC5w942nukkcu74Ldp0CXZnuLxlAg2Jc0ZYIjQmT4xqFDFRm5tBLyBAtnmbzIs7ryhZjuLmpcCzCSDzhpc6YP9Inm4Lmyc8uqFbfQ0sfVD3DvZXE5N7gjU6QZEeB9MtzIbUphziHOYDNpMuYGi1zFNoJ5EnlNGKxzgGOfT1DZIN5a4AwNS0uA16I3DlrHPa2sHkGYdFpcDEA8sw87BOoOEffRg1BqTGYgNqVHFo/hEEAC4cHwwEE/XAPkrA5rSYqNLYaGNb9mwfPN3edHraSAPxXEUx3M4BpuBmSZEtdJJBHvAbc97odoc2m/PFmtf7wuRLqjo96JEXHyV0YNr7BS7i7Fio4FucFxyw25GUZoNtyADrsnVF2hzoLpLHgNJE5mDM3TbMNLaJK2POlUff1CkzzMUwl2ajJUg9d4uF2acU1IVFJtWNQg7IPToq3slJhBVgCrcmI5MHNNM1kotsJnNCCmRSKKYRWGZB6QqIvCMY1CctCTaouCnCgxWhZmUEKhgK3hVI+8dTf9FRijaOdvVavDaUj0A/6SzdQD+UZ/70Q9R12+K0K1AbfLzQGIMAeI+cKrG02LHc3A1uQGb5RzWRioINxp+S1qNP8AhN3te+/l4/NZGOpnKYAB+KrxfF6hrU1uFnuCbgnwvDY8rKWPdaII8Z05p8HTIAnWTtsdB8I8wtA8PLoLyAI3FzfWNdJ9VROSU22B6mHw7Dl1SRoGzz1NufIojj3En4WnnLCZMCdBe7vXu+exhbWHpsZ3WyTrcXuNPKxhc/7Q1HDIXG8Ot9ky0lp9R4q3h5LJmVrQeC1VnLjijarnZoaahBiLTFoExOliRquoqYqGVaE5SzMzIIMZHFrwIuGk5hJJJ1ssChi2sghjA7mGNDp8QJVPs3h6r31XNcCA1xdAJLnPmNp7rrn+nddrK4yg+bSjRLYyH0xFjEiI5brQ9ncOQ6qWguPYujTUvpjnaRmFyq8bhzScGVGwQYIsdDp6LU9njlGcD3habXD7ZenuifEKzNOKxuUQc+lo67HY45A5xDpBGXvgiBcgkz05C3ly2GpZHB1mk3uBFy10keDRrayMxGLc4g5RLyBHq0utvb4qVTDhuUEZh7uaZMZYvvoQIOgg+HIxx7NV3iJPcIpcSLWkOAANrd4Q1pkAnoRYbRpIWdUxTapLRZsT3egOXpMT6+h3DGZnOacxDom8iwiXW7ugbfbN5WcMwB7zmgS10hpGudkd4ATIcHaXkdFOaELfXQLfQs4ZwuagIkw4h1tYc0nunUwT6ea7JvZ6NPdjO/o2zy08rOJg6z1QIrsbVYyJLnPIPiNRvIEeSY4gioHEyzvuJFomnDb7m8TtHrzMs5ZdfCyrmtD8RzVyxjAQHtc15vLdtDoBcxus3GYptF72MackDM5riTJbDWiTJmxnpOyrw2MqVe0yyA8PFMAkGzqdw60Ete4iL90pf+luLTTqlrX9p2uSXZsoDQGgixjvGJ0dBV0IKKqW3d77tixVQXTn6OWVGPiGvLiQMsElpnKQ4y0uMCwIBC500mCo2pQzhsPLg/KSMoAzyD32mZtsddANB2LcwtYZaMrqeRtoh1N7QJ2IcW3nfqmw1RjargKJzQ5jxmJa0EMzACQAZIbGlhAAV0G4pvvsVyVAnDcSxzzWqOnIGti2W1WpUcY5AAeqcPr03w4us83M5TmJJH/AnXbwQuG4fSDg2HQ4mcx90C7wbCRccpvtrs06TXOLXO72ar3fdBzudBMHWS7vNN9dgE83GLbWxFowDF48EZaLspGWXE3daNuWWP7eaSfOyabshmAwjUtIptcCJmLWnfzsk8aitvmPGLo8+zpyRyTZU2VdcccNUmhSotVzGwlcqA3Q9OnCuUQpNCqepWTlKU0qFZ9vglog1MSS7yCOpBCMbbwhHUzzQyEmSa1WtCjHJMVQ9SojXbJaANSPFdHh6RAAyCAPlF/3yWFw4ZqhfszT+o/v5LoaUuFiLaiD1nwOnxVHEPZBfcV4x4u287k6dL+axsTaL7ifAFdEcFnBnUQbQRAsbxOglE4fhDW2IB2iBMGIJnxPoFRDNGAEAYLD1DTaJMmLGwgmG+pRmH4O0d550ueWkCZ1uR6FaDMQW2YwZrENHIbfvZVOFVwEhswHFmYAmRo7NYE8uh6rO8k5N1oRKy+m+mxwm0uAB2kgRrpYi/VUYioQ51pIEgTpHvaXBsbdeizuyqOaCQHA+6HB2Um2UEj3ZyxvP9wUsVSYHVCHPI5MOV3fE0u8ZlxmZEG48njhSer1HUS3G8VYGCWl0ZTc/aaBNtTr0vK532qe5wzON2gGAZhpygW2vPrvqdPHEtY41BGYEsNg7u1SQBqGyXARrDZQfHYNCrmaA4NaQZJIa54JBB27xPKw5LXw8VCUWl1r9Ax0aOLqYkEWN78113sThmDDufcljsxgci2xAcJsJsR6kLiMvRdVwSu5mHNP3W5yT13n1A9V0+KjeOl3l09i3j9UPqggmwuLwLRMH3b7dShacfVaQ0ZY5ZtfP9YVNWoRe0366uaMvxT/AEbO3uzm77iJgACSBGp0I6Sqkqik9itHQ0ezyENEPyOEzJIOQl3IEXMbQVmYniD4B+qGuJ5AtYXkHY2j4IrBMguZJ7rQHERBBv8A2i1/FxuNL8Jhj2dUEA9+m+csSCHsdBiT3sg+CzWo23r/ACFthPDeCFjHBxJJIzZTJAFiLAwffsZ/Tf4eadNkHvWiXEXaXOqDMRv3SL/mpU3htnEXLZsCSLEmegznfzWFiy9p7KNASHaWD4zQdu8z8XmudKUs7ab8Spu2F4vGUmkOBOcAgXBEZcskG4sBymBA0SwAc80w8CA14qaANa9pAETd0gtgCRyAlAVWE4psgEMBNQx3bMpxIH321CerjzTtx7mnM8O7Vzw9wMZSMjj3be8C467iFdyfhXLvX7+/kFU9jZ4hi2U+ye0DNDoG3ehrbEX1N7WBnUrFxD31O2cHEudlpt0BDjMmf6AJ0Q2JoCpVqOL9AMrB9UGGy6YES5sRbSUVXIb2pYBnzOiPqlwqtBN7Eh0SmjFRSrf+dg2NQrEntGf7bnMkgT2jqrGOeRrGUt30JQmM4k0jOAA5wIdNpObMQ7LvMaWBPkC+FEsNRvekGkS1xl2dzpgXjTNbfJtoLBQa6hUY+AZLAA2fdIuJPulsDMb2TJxjLVdV8vepEjPxcTTywIEOiQ29RoNtbgOAjUQNxGqcK5zWkPYHjKC06EjsjBIFi0iRGxiBth1aIhnY3BqEVHHUuDmMLm8mjI2Y6FTfiA2A50Op5gWt7wJIsfC08wrJQbqvENakW8QdDCww4Z5kXIGVg8+75ZSnUuJBrvdytuTmMEXuCBEwQdraiLSmVkYxauvoTVHGUipuaoNF1YT5rossHCvCGJVzTZJJCssTgqEp7pRSwKFbRSBUKpsgtwrcmP0Wk1oQFIgXKOpva87k+PTeVXksEyQ8ZSyTvHVHYHh5qOiLGwnTVo/MrVo8MZlaTYjUeGYmXaNlpH4eqzTzRiVgHCsOWNGt+8dpmLxy28CFtU6MAk2NhtEEkRG5N9NoT0crWAtcCAY6jMZIvpEb8lQMUXETBjKZOogEgiRbnOmnNZJSc22StbZpUi6Q10QLEgAHvHnNovbcqhmMIYC0G02uCIGnWSCekbQharz2WYuMw4AhskuBzSBvGV1vLxahldRcwPMEgOvDgHS4ExckMy+hPiixqrfeNVjMqNc/KxoOsPNmgNl3MSyGTMwNb3VjcdDiIe0Gq7M4XhglwAedDNmncc9hvpRh3vB4c9pYILni8QbHKMzQL3EdIoxtGqxrASMpykNk3dIloP1jJjzCvUE3TGWgdxDEOnuw4EsGYxAc7KJ7u0Zje4nwVjKD6bc4p53OBkF05QfdkZRDYc6RE35C9WFpmoMjDltmbMw2MzbO3taJvEzoiMZh3FlQB8GYEusRBgkzuBGlvVI2lUSNjuxGYCm9n8QQGzp3oNp0AEjwB5rJ4vD2OkNY8g9pyM5CLGR09OSd2O7hsY7pvraGkxysT5rGrV87w5u97bgTbxuVdixNO+4GpmVqAZMRqJtPjrtb4hElhc9kEBtgBvJA6c/mk+kQXEu2PW2gdpcT8wmbQcS1zSTD8oET3hmiBP3YXR5urY2tl8iwygnMJ01+reLCZ/CUdhMHTLHHO/vZSbiWlrC4y47ZnDbUDlJFwmBLm9wgmzje8CBlAN9SGjc3XQ4DByBmsIZOmVpDxmIAv7pIk2iDHPLnyKK3I9CHB8C8Gw7pk5ogPEAQ4jTR1+nKZ6OoxjHUjGrQwzB72d1TQidWkyDuOir4a1/YHuQYrQDERL8vSbGP8qGMq5Q0w0mm0n3rZi5zSAZuYYLcyuTlySyT+aK5MjWw3dc5tRpflzCnMuc0XFgesQRvrzdpptqQ8O77GNuLgF7XSCOfdJH3RzWThsUaR7RpLgBEa3f2VgNDIdUAtr4SXdTdVex4dB7skmIDW2dFsxNzY8z4W9m+r0IkU0qtJtUlwPfdWDxMg5c8gGZaPcttbmYA4hRqvqOywXBwGWNi54gmNRlEcwQtXiuEFOo45Wktc5wvckucdNLyZ8kNg+9WrPDsvZ1XOFpDgwgEG45sv49FfGdfjXd9ydSzGAZi6o0AZGnMIEDO0MaY1sWkzzIQWHr5XdoXjM3IKjMkghuVhl2g0DrczvY14jGtJc8TAJmwMiW2yjW5EHqINlPChkloILSxxe4AgkFthJMauBB18VZGNR1GWxZicc8VQMoJLgCRIzGzm5iCCQGugXjvnorm4h1ZjahLQDzzEEANMXBM5SSOpiUO+uSQ4tBAytu4WHnYuAIFrRExtRhsaGdnTyh7cw2kgSMxaPtZZE+OqPJ+FUtff8BvQvdiHtD3mmXGmGZWtBbnzXc49Iputf4XZuEOY1CJaTUbG7mkU5yj7JDqokaWVtTEBvcce+KjRYQO6wQ0gbS46cx5ZdYuFOpNiKls0xBAbDuV2/8AFGCb209+/mC9QjE1BSBYw5mkMJebhpGeMpGrYyjySWZRxDjFicpcA0m0HSTsbC+8JLQocu/2GRiNTjVJJbBxFWNSSSsDJNUwkklFJSoVdPMJJILci3CqF3tG2dgjzC6Dg1Jv8OwvE2F70xdMks3EP8PvuIzYqiH25/k9CUHkgXOnPwTpLBHYTqZrnHs9Tow+cuR2HqHtCJNnvAvoO4Y8JJPmkktM1v6hROrY0WizRUpwNhLGEwNpk+pVXGtB1ietqYv6n1SSVcPjiN1IcDN6R3NO5594C/kAPAK/EGa+Hm9yfPsgfndJJPP435P9GE06TR2hbHdzN7u3+pV28h6BT4+0CnYR3draMYR8ST5pJLHH/IhUcVjTceDP/sUsKYzEW7h0t9cJJLr/AJR+hZiROef3amj+GWDCLHvmRYzm1nnqkkqsvwIQ0eHMH0x1h9caefzA9F2HDKDXYRhc1pLgJJAJMm8ndJJcvi3qvT7jdWZzR3mDbs3GNvenTxWBSqOLmyT68wwH4AJJIYOvvvEXv6AEwawGgcI6fxGLUpuOalc2L46WZp6n1SSWvL+/6BMbjbj2ev1Hn0rOha+GaMtUxu8eXZNMeE3SSRyf415v7AlscZs//wCJn/6KQW9MUaMWl9UHqBUpgfCySS25enn9hwh7R9GomBOStff6u/kPQIXGiKdZwsR20EWI7h0O2p9Uklkx7+r/AFYi3LcewdoTAn6S6+/+pHyAHgAgqn1+rnz1gGJ5p0k+PZAXQzcWP4Ad9bORO8QLTySSSXRxbPzLUf/Z"
                    />
                  }
                >
                  <Meta title="Green energy" description="Keep it green cuz it's cool" />
                </Card>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </Container>

      {/* <Container>
        <section className="homepage__section-feature">
          <div className="homepage__feature-outerdiv">
            <ScrollAnimation animateOnce={true} animateIn="fadeInLeft">
              <div className="homepage__feature-div">
                <div className="homepage__feature-icon-div">
                  <i className="homepage__feature-icon fas fa-clock"></i>
                </div>
                <div className="homepage__feature-text">
                  <div className="homepage__feature-title">
                    This thing will save a lot of your time, no joke, I promise you, its good
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          <div className="homepage__feature-outerdiv">
            <ScrollAnimation animateOnce={true} animateIn="fadeInDown">
              <div className="homepage__feature-div">
                <div className="homepage__feature-icon-div">
                  <i className="homepage__feature-icon fas fa-dollar-sign"></i>
                </div>
                <div className="homepage__feature-text">
                  <div className="homepage__feature-title">
                    When you save time, you save money, think about that just for a sec
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          <div className="homepage__feature-outerdiv">
            <ScrollAnimation animateOnce={true} animateIn="fadeInRight">
              <div className="homepage__feature-div">
                <div className="homepage__feature-icon-div">
                  <i className="homepage__feature-icon fas fa-truck-pickup"></i>
                </div>
                <div className="homepage__feature-text">
                  <div className="homepage__feature-title">
                    We have the best stuffs in the market, we don't play play, seriously
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </Container> */}

      {/* <section className="homepage__section-intro">
        <div className="homepage__intro-img-parent">
          <div className="homepage__intro-img--transparent-div">
            <img
              ref={(element: any) => {
                imageElement = element;
              }}
              onMouseEnter={scaleup}
              onMouseLeave={scaledown}
              className="homepage__intro-img--transparent"
              src={transparent_background_truck_img}
              alt="transparent truck"
            />
          </div>
          <div className="homepage__intro-img-overlay"></div>
          <div className="homepage__intro-img--ori-div">
            <img
              className="homepage__intro-img--ori"
              alt="trucklogo"
              src="https://www.daimler.com/bilder/innovation/autonomes-fahren/future-truck-2025/14c1049-42-klein-w1024xh512-cutout.jpg"
            />
          </div>
        </div>
        <div className="homepage__intro-text-outerdiv">
          <ScrollAnimation animateOnce={true} animateIn="bounceInRight">
            <div className="homepage__intro-title margin_b-2">Load and Roll</div>
            <div className="homepage__intro-text">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
              sunt in culpa
              <br />
              <br />
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
              et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.
              <br />
              <br />
              Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam
              et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.
            </div>
          </ScrollAnimation>
        </div>
      </section> */}

      <section className="homepage__section-third">
        <div className="homepage__third-left">
          <div className="homepage__third-title">So Many Trucks To Choose</div>
          <div className="homepage__third-subtitle">Don't even know where to start</div>
          <div className="homepage__third-text">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
            sunt in culpa qui officia deserunt.
            <br />
            <br />
            Mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
          </div>
        </div>
        <div className="homepage__third-right">
          <Parallax className="homepage__third-img-div" x={['150px', '-0px']} tagOuter="figure">
            <img className="homepage__third-img" alt="green hino" src={transparent_green_hino} />
          </Parallax>
        </div>
      </section>
      <section className="homepage__section-third">
        <div className="homepage__third-text">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
          atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
          sunt in culpa qui officia deserunt. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
          praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt.
          <br />
          <br />
          Mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
          libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
        </div>
      </section>
    </div>
  );
}

export default HomePage;

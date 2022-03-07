import React, { useState, useRef, useEffect } from 'react';
import './SpecificMechanic.scss';
/* components */
/* 3rd party lib */
import axios from 'axios';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAxiosHeaderToken } from 'src/shared/Utils';

/* Util */
interface SpecificMechanicProps {}

type Props = SpecificMechanicProps;

const SpecificMechanic: React.FC<Props> = () => {
  /* ================================================== */
  /*  state */
  /* ================================================== */

  //   const [data, setData] = useState<any[]>([]);
  const [dict, setDict] = useState<any>(null);
  console.log(dict);
  const dictRef = useRef<any>(null);
  //   const data = [
  //     {
  //       name: 'Day 1',
  //       Target: 900,
  //       Average: 2400,
  //       User: 2400,
  //     },
  //     {
  //       name: 'Day 2',
  //       Target: 901,
  //       Average: 1398,
  //       User: 2210,
  //     },
  //     {
  //       name: 'Day 3',
  //       Target: 500,
  //       Average: 5000,
  //       User: 2290,
  //     },
  //     {
  //       name: 'Day 4',
  //       Target: 901,
  //       Average: 3908,
  //       User: 2000,
  //     },
  //     {
  //       name: 'Day 5',
  //       Target: 905,
  //       Average: 4800,
  //       User: 2181,
  //     },
  //     {
  //       name: 'Day 6',
  //       Target: 1,
  //       Average: 3800,
  //       User: 2500,
  //     },
  //     {
  //       name: 'Day 7',
  //       Target: 1001,
  //       Average: 4300,
  //       User: 2100,
  //     },
  //   ];

  /* ================================================== */
  /*  method */
  /* ================================================== */
  /* ================================================== */
  /*  useEffect */
  /* ================================================== */
  let mechanics = [7, 8, 9, 13, 14, 15, 16, 17, 18, 19, 20];
  useEffect(() => {
    let startOfMonth = moment('6/1/2021').format('DD/MM/YYYY');
    let endOfMonth = moment('7/4/2021').format('DD/MM/YYYY');

    let generate_data = {
      date_from: startOfMonth,
      date_to: endOfMonth,
      interval: 'weekly',
    };

    let mechanicDict: any = {};

    // let resultArray: { date: string; Target: number; Average: number; User: string }[] = [];
    mechanics.forEach((mechanicId) => {
      console.log('change');
      axios
        .post(
          `${process.env.REACT_APP_API}/pages/job_monitoring/generate_mechanics_data/${mechanicId}`,
          { generate_data },
          getAxiosHeaderToken(),
        )
        .then((res) => {
          //   let tempArray: any[] = [];

          res.data.data.forEach((child: any) => {
            mechanicDict[child.date] = {};
          });

          //   setData((prevState) => [...prevState, ...tempArray]);
          dictRef.current = mechanicDict;
          setDict(mechanicDict);
        })
        .catch((err) => console.log(err));
    });
  }, [mechanics]);

  useEffect(() => {
    let startOfMonth = moment('6/1/2021').format('DD/MM/YYYY');
    let endOfMonth = moment('7/4/2021').format('DD/MM/YYYY');

    let generate_data = {
      date_from: startOfMonth,
      date_to: endOfMonth,
      interval: 'weekly',
    };

    // after initialize date done, start initializing users
    console.log('hello???', dictRef.current);
    if (dictRef.current) {
      let tempDict = { ...dictRef.current };
      mechanics.forEach((mechanicId) => {
        console.log('change');
        axios
          .post(
            `${process.env.REACT_APP_API}/pages/job_monitoring/generate_mechanics_data/${mechanicId}`,
            { generate_data },
            getAxiosHeaderToken(),
          )
          .then((res) => {
            //   let tempArray: any[] = [];

            res.data.data.forEach((child: any) => {
              //   tempDict[child.date][`User${mechanicId}`] = {};
              console.log(tempDict, tempDict[`${child.date}`], child.date);
            });

            //   setData((prevState) => [...prevState, ...tempArray]);
            setDict(tempDict);
          })
          .catch((err) => console.log(err));
      });
    }
  }, [mechanics]);

  /* ================================================== */
  /* ================================================== */
  return (
    <>
      <section className="performance__section-bottom">
        <h2>Mechanic 1</h2>
        <div>{moment().format('MMMM')}</div>
        <div style={{ height: '500px', width: '1000px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={1000}
              height={300}
              //   data={data.sort((a, b) => a.date.localeCompare(b.date))}
              data={[]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Target" stroke="#8884d8" dot={{ r: 1 }} activeDot={{ r: 3 }} />

              <Line type="monotone" dataKey={`Average`} stroke="#82ca9d" dot={{ r: 1 }} activeDot={{ r: 3 }} />

              <Line type="monotone" dataKey="User" stroke="#f72119" dot={{ r: 1 }} activeDot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
};

export default SpecificMechanic;

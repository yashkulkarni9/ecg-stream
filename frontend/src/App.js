import { useEffect, useRef, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

function App() {
  const [data, setData] = useState([]);
  const dataRef = useRef([]);

  useEffect(() => {
    const source = new EventSource('http://localhost:8000/waveform-stream');
    console.log('Streaming ECG data...');

    source.onmessage = (event) => {
      const point = JSON.parse(event.data);
      dataRef.current = [...dataRef.current.slice(-49), { ...point, index: dataRef.current.length }];
      setData([...dataRef.current]);
    };

    source.onerror = (err) => {
      console.error('Stream error:', err);
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <div style={{
      backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh', padding: '2rem',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <h1 style={{ marginBottom: '2rem' }}>ECG Stream</h1>
      <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', width: '80%' }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" />
            <XAxis dataKey="index" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="signal_value" stroke="#0ea5e9" dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;

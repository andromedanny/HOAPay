const officers = [
    { name: 'Jane Doe', role: 'President', email: 'jane@hoa.com' },
    { name: 'John Smith', role: 'Vice President', email: 'john@hoa.com' },
    { name: 'Emily Rose', role: 'Treasurer', email: 'emily@hoa.com' },
  ];
  
  export default function Officers() {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>HOA Officers</h1>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {officers.map((officer, i) => (
            <div key={i} className="card">
              <h3>{officer.name}</h3>
              <p>{officer.role}</p>
              <p>{officer.email}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
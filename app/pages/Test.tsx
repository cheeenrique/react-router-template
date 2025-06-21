export default function Test() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Teste de Hidratação
        </h1>
        <p className="text-blue-700">
          Se você está vendo esta página, a hidratação funcionou!
        </p>
        <button 
          onClick={() => alert('JavaScript funcionando!')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Testar JS
        </button>
      </div>
    </div>
  );
} 
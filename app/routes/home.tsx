import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Heart, Shield, Users, Phone, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const menuItems = [
    {
      id: 'login',
      label: 'Fazer Login',
      description: 'Acesse sua conta para personalizar sua experiência',
      href: '/login',
      icon: Heart,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'avaliacao-seguranca',
      label: 'Avaliação de Segurança',
      description: 'Análise personalizada da sua situação com orientações específicas',
      href: '/avaliacao-seguranca',
      icon: Shield,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'rede-apoio',
      label: 'Rede de Apoio',
      description: 'Encontre delegacias, ONGs e serviços próximos a você',
      href: '/rede-apoio',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'contatos-emergencia',
      label: 'Contatos de Emergência',
      description: 'Acesso rápido aos principais números de ajuda',
      href: '/contatos-emergencia',
      icon: Phone,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'recursos-educativos',
      label: 'Recursos Educativos',
      description: 'Informações sobre seus direitos e leis de proteção',
      href: '/recursos-educativos',
      icon: BookOpen,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Heart className="h-16 w-16 text-red-600 fill-current animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Acolher</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Sua segurança e bem-estar são nossa prioridade. Encontre apoio, informações e recursos para sua proteção.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.id}
                to={item.href}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-xl p-6 h-full hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-red-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span className="text-sm">Acessar</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-800 rounded-2xl p-6 text-center text-white shadow-xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Emergência?</h2>
          <p className="mb-4">Se você está em perigo imediato, procure ajuda:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-red-800 hover:bg-gray-100 font-bold py-3 px-6">
              <Phone className="h-5 w-5 mr-2" />
              Ligue 190 - Polícia
            </Button>        
            <Button className="bg-white text-red-800 hover:bg-gray-100 font-bold py-3 px-6">
              <Phone className="h-5 w-5 mr-2" />
              Ligue 180 - Central da Mulher
            </Button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center text-white/80 text-sm mt-8">
          <p>Este é um projeto de apoio à segurança da mulher.</p>
          <p>Seus dados são confidenciais e sua privacidade é respeitada.</p>
        </div>
      </div>
    </div>
  );
}

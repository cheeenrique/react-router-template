import React from 'react'
import { Heart, Menu, Shield, Users, Phone, BookOpen, ArrowLeft } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/Drawer'
import { Button } from '../ui/Button'

interface HeaderProps {
  onMenuClick?: (menuItem: string) => void
}

const menuItems = [
  {
    id: 'avaliacao-seguranca',
    label: 'Avaliação de Segurança',
    description: 'Análise personalizada da sua situação com orientações específicas',
    href: '/avaliacao-seguranca',
    icon: Shield
  },
  {
    id: 'rede-apoio',
    label: 'Rede de Apoio',
    description: 'Encontre delegacias, ONGs e serviços próximos a você',
    href: '/rede-apoio',
    icon: Users
  },
  {
    id: 'contatos-emergencia',
    label: 'Contatos de Emergência',
    description: 'Acesso rápido aos principais números de ajuda',
    href: '/contatos-emergencia',
    icon: Phone
  },
  {
    id: 'recursos-educativos',
    label: 'Recursos Educativos',
    description: 'Informações sobre seus direitos e leis de proteção',
    href: '/recursos-educativos',
    icon: BookOpen
  }
]

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'
  
  // Páginas principais do menu que não devem mostrar o botão voltar
  const mainMenuPages = [
    '/avaliacao-seguranca',
    '/rede-apoio', 
    '/contatos-emergencia',
    '/recursos-educativos'
  ]
  
  const isMainMenuPage = mainMenuPages.includes(location.pathname)
  const shouldShowBackButton = !isHomePage && !isMainMenuPage

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo e Nome com Botão de Voltar */}
          <div className="flex items-center space-x-2">
            {shouldShowBackButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-red-700 mr-2"
                onClick={handleGoBack}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Voltar</span>
              </Button>
            )}
            <Heart className="h-8 w-8 animate-pulse" />
            <h1 className="text-2xl font-bold">Acolher</h1>
          </div>

          {/* Menu Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent side="right" className="w-full p-4 bg-white">
              <DrawerHeader>
                <DrawerTitle className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-red-600" />
                  <span>Menu Acolher</span>
                </DrawerTitle>
                <DrawerDescription>
                  Navegue pelas opções disponíveis para sua segurança e bem-estar.
                </DrawerDescription>
              </DrawerHeader>
              
              <nav className="mt-6 space-y-4">
                {menuItems.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                      onClick={() => onMenuClick?.(item.id)}
                    >
                      <div className="flex-shrink-0 mr-3 mt-1">
                        <IconComponent className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {item.label}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  )
} 
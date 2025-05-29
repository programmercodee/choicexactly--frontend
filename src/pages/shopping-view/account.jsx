import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .account-container {
    animation: fadeIn 0.6s ease-out;
  }

  .hero-section {
    position: relative;
    overflow: hidden;
  }

  .hero-section::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.5)
    );
  }

  .hero-section img {
    transition: transform 0.5s ease;
  }

  .hero-section:hover img {
    transform: scale(1.05);
  }

  .account-content {
    animation: fadeIn 0.8s ease-out;
    animation-delay: 0.2s;
    animation-fill-mode: both;
  }

  .tabs-container {
    background: linear-gradient(135deg, #ffffff, #f8fafc);
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .tabs-list {
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
    padding: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }

  .tabs-trigger {
    position: relative;
    padding: 0.75rem 1.5rem;
    font-weight: 500;
    color: #4b5563;
    transition: all 0.3s ease;
    border-radius: 0.5rem;
  }

  .tabs-trigger:hover {
    color: #1e40af;
    background: rgba(59, 130, 246, 0.1);
  }

  .tabs-trigger[data-state="active"] {
    color: #1e40af;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .tabs-trigger[data-state="active"]::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #1e40af, #3b82f6);
    border-radius: 2px;
  }

  .tabs-content {
    animation: slideIn 0.3s ease-out;
    padding: 1.5rem;
  }

  .tabs-content[data-state="inactive"] {
    display: none;
  }

  .tabs-content[data-state="active"] {
    animation: slideIn 0.3s ease-out;
  }
`;

function ShoppingAccount() {
  return (
    <>
      <style>{styles}</style>
      <div className="account-container">
        <div className="hero-section h-[300px] w-full overflow-hidden">
          <img
            src={accImg}
            className="h-full w-full object-cover object-center"
            alt="Account Banner"
          />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="account-content max-w-6xl mx-auto">
            <div className="tabs-container">
              <Tabs defaultValue="orders" className="w-full">
                <TabsList className="tabs-list">
                  <TabsTrigger
                    value="orders"
                    className="tabs-trigger"
                  >
                    Orders
                  </TabsTrigger>
                  <TabsTrigger
                    value="address"
                    className="tabs-trigger"
                  >
                    Address
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="orders"
                  className="tabs-content"
                >
                  <ShoppingOrders />
                </TabsContent>

                <TabsContent
                  value="address"
                  className="tabs-content"
                >
                  <Address />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingAccount;

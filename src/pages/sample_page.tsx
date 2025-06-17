import React from 'react';
import {
    Button,
    Input,
    Checkbox,
    Card,
    Badge,
} from '@ketan_nimase/ui';

const SamplePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [subscribed, setSubscribed] = React.useState(false);

    return (
        <div className="min-h-screen w-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Company Name</h1>
                    <div className="flex items-center space-x-4">
                        
                        <Button style="transparent" colorVariant="primary">Sign In</Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
                    <p className="text-xl mb-8">Discover amazing features and boost your productivity</p>
                    <Button style="filled" colorVariant="secondary" className="text-lg px-8 py-3">
                        Get Started
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} >
                                <h3 className="text-xl font-semibold mb-4">Feature {i}</h3>
                                <p className="text-gray-600 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed do eiusmod tempor incididunt ut labore.
                                </p>
                                <Button style="outline" colorVariant="primary">Learn More</Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">Subscribe to Our Newsletter</h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Input
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-grow"
                            />
                            <Button
                                style="filled"
                                colorVariant="primary"
                                onClick={() => setSubscribed(true)}
                            >
                                Subscribe
                            </Button>
                        </div>
                        <div className="mt-4 flex justify-center items-center space-x-2">
                            <Checkbox
                                name="terms"
                                checked={subscribed}
                                onChange={() => setSubscribed(!subscribed)}
                            />
                            <span className="text-sm text-gray-600">
                                I agree to receive marketing emails
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">About Us</h3>
                            <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Connect</h3>
                            <div className="flex space-x-4">
                                <Badge colorVariant="primary" label="Twitter" />
                                <Badge colorVariant="secondary" label="LinkedIn" />
                                <Badge colorVariant="info" label="GitHub" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                            <p className="text-gray-400 mb-4">Stay updated with our latest news</p>
                            <Input
                                placeholder="Email address"
                                name="footer-email"
                                className="bg-gray-800 border-gray-700"
                            />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SamplePage;
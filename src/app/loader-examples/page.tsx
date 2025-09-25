import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { 
  UniversalLoader, 
  GlobeLoader, 
  ComponentLoader, 
  CardLoader, 
  MinimalLoader 
} from '@/components/ui/universal-loader';

// Simulate a heavy component with artificial delay
const HeavyComponent = dynamic(() => 
  new Promise(resolve => 
    setTimeout(() => resolve({ default: () => <div className="p-4 bg-green-100 rounded">Heavy Component Loaded!</div> }), 3000)
  ), 
  { loading: () => <ComponentLoader message="Loading heavy component..." /> }
);

export default function LoaderExamples() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Universal Loader System</h1>
        <p className="text-muted-foreground">Comprehensive loading states for better UX</p>
      </div>

      {/* Loader Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Loader Variants</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Default Loader */}
          <div className="space-y-3">
            <h3 className="font-medium">Default Loader</h3>
            <div className="border rounded-lg p-4 flex justify-center">
              <UniversalLoader 
                variant="default"
                size="md"
                message="Loading..."
                description="Please wait"
              />
            </div>
          </div>

          {/* Globe Loader */}
          <div className="space-y-3">
            <h3 className="font-medium">Globe Loader</h3>
            <div className="border rounded-lg p-4 flex justify-center">
              <GlobeLoader />
            </div>
          </div>

          {/* Card Loader */}
          <div className="space-y-3">
            <h3 className="font-medium">Card Loader</h3>
            <div className="border rounded-lg p-4 flex justify-center">
              <CardLoader />
            </div>
          </div>

          {/* Minimal Loader */}
          <div className="space-y-3">
            <h3 className="font-medium">Minimal Loader</h3>
            <div className="border rounded-lg p-4 flex justify-center">
              <MinimalLoader size="md" />
            </div>
          </div>
        </div>
      </section>

      {/* Size Variations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Size Variations</h2>
        
        <div className="flex flex-wrap gap-8 items-end justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Small</p>
            <UniversalLoader size="sm" message="Small" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Medium</p>
            <UniversalLoader size="md" message="Medium" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Large</p>
            <UniversalLoader size="lg" message="Large" />
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Extra Large</p>
            <UniversalLoader size="xl" message="Extra Large" />
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Practical Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dynamic Component Loading */}
          <div className="space-y-3">
            <h3 className="font-medium">Dynamic Component (3s delay)</h3>
            <div className="border rounded-lg p-4 min-h-[200px]">
              <Suspense fallback={<ComponentLoader message="Loading component..." />}>
                <HeavyComponent />
              </Suspense>
            </div>
          </div>

          {/* Button Loading States */}
          <div className="space-y-3">
            <h3 className="font-medium">Button Loading States</h3>
            <div className="border rounded-lg p-4 space-y-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded">
                <MinimalLoader size="sm" />
                Submitting...
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded">
                <MinimalLoader size="sm" />
                Processing Payment...
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded">
                <MinimalLoader size="sm" />
                Uploading File...
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Messages */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Custom Messages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ComponentLoader message="Fetching user data..." />
          <ComponentLoader message="Processing payment..." />
          <ComponentLoader message="Uploading documents..." />
        </div>
      </section>

      {/* Integration Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Real-World Integration</h2>
        
        <div className="prose max-w-none">
          <h3>Usage in Components:</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`// Globe component loading
const World = dynamic(() => import('./ui/globe'), {
  loading: () => <GlobeLoader />
});

// Form submission
{isSubmitting ? (
  <MinimalLoader size="sm" />
) : (
  'Submit Form'
)}

// Data fetching
{isLoading ? (
  <CardLoader />
) : (
  <DataComponent data={data} />
)}`}
          </pre>
        </div>
      </section>
    </div>
  );
}
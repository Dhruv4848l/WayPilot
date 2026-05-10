import React from 'react';

const ExpenseInvoice = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <div className="w-full md:w-1/2">
          <input 
            type="text" 
            placeholder="Search invoice..." 
            className="input-field"
          />
        </div>
        <div className="flex gap-2">
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Filter</option></select>
          <select className="input-field py-2 text-sm bg-bg-surface"><option>Sort</option></select>
        </div>
      </div>

      <a href="/trips" className="text-sm text-text-secondary hover:text-brand-primary mb-6 inline-block">← back to My Trips</a>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Invoice Section */}
        <div className="flex-1 card p-8">
          <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-brand-primary/20 pb-8">
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 bg-bg-elevated flex items-center justify-center border border-brand-primary/10">IMG</div>
              <div>
                <h2 className="font-semibold text-lg">Trip to Europe Adventure</h2>
                <p className="text-sm text-text-secondary">Aug 10 - Jun 20, 2025 • 4 cities visited in total</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm mt-6 md:mt-0">
              <div>
                <p className="text-text-secondary mb-1">Invoice ID</p>
                <p className="font-mono">INV-ago-30290</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Generated date</p>
                <p>May 20, 2025</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Traveler Details</p>
                <p>James<br/>Arjun<br/>Jerry<br/>Cristina</p>
              </div>
              <div>
                <p className="text-text-secondary mb-1">Payment status</p>
                <span className="text-status-warning bg-status-warning/10 px-2 py-1 rounded">pending</span>
              </div>
            </div>
          </div>

          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="border-b border-brand-primary/20 text-sm text-text-secondary">
                <th className="py-3 font-normal">#</th>
                <th className="py-3 font-normal">Category</th>
                <th className="py-3 font-normal">Description</th>
                <th className="py-3 font-normal text-right">Qty/details</th>
                <th className="py-3 font-normal text-right">Unit Cost</th>
                <th className="py-3 font-normal text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-brand-primary/10">
                <td className="py-4">1</td>
                <td className="py-4">hotel</td>
                <td className="py-4">hotel booking paris</td>
                <td className="py-4 text-right">3 nights</td>
                <td className="py-4 text-right">3000</td>
                <td className="py-4 text-right">9000</td>
              </tr>
              <tr className="border-b border-brand-primary/10">
                <td className="py-4">2</td>
                <td className="py-4">travel</td>
                <td className="py-4">flight bookings (DEL -&gt; PAR)</td>
                <td className="py-4 text-right">1</td>
                <td className="py-4 text-right">12000</td>
                <td className="py-4 text-right">12000</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end border-b border-brand-primary/20 pb-6 mb-6">
            <div className="w-64 text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Subtotal</span>
                <span>$ 21000</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-text-secondary">Tax(5%)</span>
                <span>$ 1050</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-text-secondary">Discount</span>
                <span>$ 50</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-brand-primary/20">
                <span>Grand Total</span>
                <span className="text-brand-primary">$ 22000</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button className="btn-outline py-2 px-4 text-sm">Download Invoice</button>
              <button className="btn-outline py-2 px-4 text-sm">Export as PDF</button>
            </div>
            <button className="btn-outline py-2 px-4 text-sm">Mark as paid</button>
          </div>
        </div>

        {/* Right Sidebar: Budget Insights */}
        <div className="w-full lg:w-72">
          <div className="card p-6">
            <h3 className="font-semibold mb-6">Budget Insights</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full border-4 border-brand-primary border-t-bg-subtle flex items-center justify-center">
                <span className="text-xs text-text-secondary">Chart</span>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-text-secondary">Total Budget: <span className="text-text-primary">20000</span></p>
                <p className="text-text-secondary">Total Spent: <span className="text-brand-primary">22000</span></p>
                <p className="text-status-danger mt-2">Remaining: -2000</p>
              </div>
            </div>
            
            <button className="btn-outline w-full py-2 text-sm">View Full Budget</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInvoice;

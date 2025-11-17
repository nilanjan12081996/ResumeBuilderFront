'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../reducers/TransactionsSlice';
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export default function TransactionsPage() {
  const dispatch = useDispatch();

  const { loading, transactionsData, error } = useSelector(
    (state) => state.Transactions
  );

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const items = transactionsData?.data || [];

  const renderStatusBadge = (status) => {
    const lowerStatus = status?.toLowerCase();
    if (lowerStatus === 'pending') {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium text-sm">
          Pending
        </span>
      );
    }
    if (lowerStatus === 'captured' || lowerStatus === 'success') {
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium text-sm">
          Paid
        </span>
      );
    }
    return (
      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium text-sm">
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-[#151515]">Transaction History</h1>

      {loading && <p className="text-[#92278F] font-medium">Loading...</p>}
      {error && <p className="text-red-500">{JSON.stringify(error)}</p>}

      {!loading && !error && items.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-[#92278F] rounded-xl overflow-hidden">
            <thead className="bg-[#F0E3FA]">
              <tr>
                <th className="p-3 border border-[#92278F] text-left">Plan Name</th>
                <th className="p-3 border border-[#92278F]">Price</th>
                <th className="p-3 border border-[#92278F]">GST</th>
                <th className="p-3 border border-[#92278F]">Total Payment</th>
                <th className="p-3 border border-[#92278F]">Start Date</th>
                <th className="p-3 border border-[#92278F]">Expiry Date</th>
                <th className="p-3 border border-[#92278F]">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((txn) => {
                const isIndian = txn.currency === "INR";

                const priceExclGst = parseFloat(txn.amount || 0);
                const totalPayment = parseFloat(txn.total_amount || 0);

                const currencySymbol = isIndian ? "₹" : "$";

                return (
                  <tr
                    key={txn.id}
                    className="hover:bg-[#f9f0ff] transition-colors duration-200 text-[#380438]"
                  >
                    <td className="border border-[#92278F] p-3 font-medium">
                      {txn.plan_detail.plan_name}
                    </td>

                    {/* Price without GST */}
                    <td className="border border-[#92278F] p-3">
                      {currencySymbol} {priceExclGst.toFixed(2)}
                    </td>

                    {/* GST only if Indian */}
                    <td className="border border-[#92278F] p-3">
                      {isIndian ? `${currencySymbol} ${txn.gst_amount}` : ""}
                    </td>

                    {/* Total Payment */}
                    <td className="border border-[#92278F] p-3 font-semibold">
                      {currencySymbol} {totalPayment.toFixed(2)}
                    </td>

                    <td className="border border-[#92278F] p-3">
                      {new Date(txn.created_at).toLocaleDateString()}
                    </td>
                    <td className="border border-[#92278F] p-3">
                      {new Date(txn.expiry).toLocaleDateString()}
                    </td>

                    <td className="border border-[#92278F] p-3">
                      {renderStatusBadge(txn.payment_status)}
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-[#92278F] font-medium mt-4">No transactions found.</p>
      )}
    </div>
  );
}

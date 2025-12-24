import React from 'react';

const OvertimeAlert: React.FC = () => {
  const avatars = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBpB7LJ-ekl2nq3NdEDpVs_wC2nnr-ahzGI3ilQeoy5kYdw063Y9vf73UsqGk2Rxm-K-oQ1aHsclhDokln6amkeATZxC8_CoXO8MVufEbb6cfVAuV2mHQ69D6v115Y4RZxPPIufOEfmZ8ytZ_nNgSu2jK8nf4nO0FKzb1tb6fcJLN3YOfe-MXyH9CTlkpd8w92jGtRrgXw5VhHzHnGhZBOEKPieBF1DhnCnsV_Gv_tBNzseM0hze6yt2NIOGU-SRr8DeoXHXjafzt4",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD7DGoJrG64aBADjuSIC8TUkPEM96YdLLbPT_unjCugRZMn6kp0Xu1xJzG8d0j3BSdpkjaC54uutyVXv_wjWTrUT7Yypv2hT3ryfIEODvh_TCe3aBvwbfVxR4BPDDrTfr0eCugK1qgVtZgViYrp3CFodUY8eNU-Dh-XU6aYbqvxuxx-ypJXjfdaUMPWpPCH7eVvDmguAJoMgRDPgGAvgF3fARHbrHa7LlhgJUdJiFKc9jEBm6dIeAVYKQueeGRRxVKW0rhmVF03XOA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDsgQnGZiOopC0QVU7npUy_q8CRmd6yINdh07LggUnpMZ2LkURUamoO8wkcGa_VWo9-R7TxJ4PP3TNg7KcVNdngGwvvdZDRClTKpdfB2KV1lkhYG6w-f1IFSXHIk8PIom_QpKnZaZIrUrMf8LCIeqYj3D_LWEhQZAvwEGoUFdOTWUb9_gHaKvr9qY3KAiM7tM_o5DqWDB50wWhEIhe-QrMe84o9DWwRL7yn9F0T80S3ybt3tDuFpefnaVqSh8RKG8_PYc2CJsswynQ"
  ];

  return (
    <div className="px-4 mb-8">
      <div className="bg-surface-light rounded-xl p-1 border border-gray-200">
        <div className="bg-gradient-to-r from-orange-100 to-surface-light rounded-lg p-4 flex items-start gap-3">
          <div className="bg-orange-200 p-2 rounded-full shrink-0 mt-1">
            <span className="material-symbols-outlined text-orange-600 text-[20px] animate-pulse">warning</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-text-primary font-bold text-base">成員過勞預警 (超時加班)</h4>
              <span className="bg-orange-200 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Warning</span>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed mb-3">
              偵測到 <span className="text-text-primary font-bold">12 位</span> 成員本週工時已接近法定上限，建議調整排班以避免過勞。
            </p>
            <div className="flex -space-x-2 overflow-hidden mb-2 pl-1">
              {avatars.map((url, index) => (
                <div 
                  key={index}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-light bg-gray-600 flex items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: `url('${url}')` }}
                ></div>
              ))}
              <div className="h-6 w-6 rounded-full ring-2 ring-surface-light bg-surface-light border border-gray-200 flex items-center justify-center text-[10px] text-text-secondary font-bold">
                +9
              </div>
            </div>
            <button className="w-full mt-1 bg-gray-100 hover:bg-gray-200 text-text-primary text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">tune</span>
              調整排班計畫
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvertimeAlert;
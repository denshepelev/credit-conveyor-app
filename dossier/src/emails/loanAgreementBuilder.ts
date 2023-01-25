export default function loanAgreementBuilder(
  firstName: string,
  lastName: string,
  amount: number,
  rate: number,
  terms: string,
  schedule: string,
  date: string,
): string {
  return `<body style="MARGIN-TOP:0px; FONT-FAMILY:Times New Roman; COLOR:#000000; FONT-SIZE:10pt" cz-shortcut-listen="true">
    <document>
      
                <title>LOAN AGREEMENT AND PROMISSORY NOTE</title>
                <div  style = "text-align: center; display: inline-block; background-color: #fff; padding: 2rem 2rem; color: #000;">
                  <p style="MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:14pt" align="center">
                    <b>LOAN AGREEMENT AND PROMISSORY NOTE</b>
                  </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">THIS LOAN AGREEMENT AND PROMISSORY NOTE (the “Note”), is made this ${date}, by and among Mesa Verde Bank & Trust, LLC (hereinafter, known as “LENDER”) and ${firstName} ${lastName} (hereinafter, known as “BORROWER”). &nbsp;BORROWER and LENDER shall collectively be known herein as “the Parties”. &nbsp;In determining the rights and duties of the Parties under this Loan Agreement, the entire document must be read as a whole.</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt" align="center">
                    <b>PROMISSORY NOTE</b>
                  </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">FOR VALUE RECEIVED, BORROWER promises to repay to the order of LENDER, the sum of ${amount} dollars together with interest thereon at a rate of ${rate} percent (%) per annum.</p>
                  <!-- TOTAL AMOUNT AND RATE -->
                  <p style="MARGIN:0px" align="center">
                    <br>
                  </p>
                  <p style="MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt" align="center">
                    <b>ADDITIONAL LOAN TERMS</b>
                  </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">The BORROWER and LENDER, hereby further set forth their rights and obligations to one another under this Loan Agreement and Promissory Note and agree to be legal bound as follows:</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>A.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Principal Loan Amount $ ${amount}</b>
                    <!-- TOTAL AMOUNT -->
                  </p>
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>B.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Loan Repayment Terms and Schedule.</b>
                  </p>
                  <div>
                    ${terms}
                    ${schedule}
                  </div>
                  <!-- TERMS -->
                  <!-- SCHEDULE -->
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>C.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Collateral.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">LENDER pledges the property of the BORROWER</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>D.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Method of Loan Payment.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">The BORROWER shall make all payments called for under this loan agreement by sending check or other negotiable instrument made payable to the following individual or entity at the address indicated:</p>
                  <p style="MARGIN:0px">
                    <br>
                    <br>
                  </p>
            
                  <p style="MARGIN:0px">
                    <br>
                  </p>
              
                  <p style="PAGE-BREAK-BEFORE:always; MARGIN:0px">
                    <br>
                  </p>
                  <p style="TEXT-INDENT:48px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">Mesa Verde Bank & Trust</p>
                  <p style="TEXT-INDENT:48px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">8500 Menaul Blvd NE # A125</p>
                  <p style="TEXT-INDENT:48px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">Albuquerque, New Mexico 87112</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">If LENDER gives written notice to BORROWER that a different address shall be used for making payments under this loan agreement, BORROWER shall use the new address so given by LENDER.</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:10px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>E.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Default.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">The occurrence of any of the following events shall constitute a Default by the BORROWER of the terms of this loan agreement and promissory note:</p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:22px; WIDTH:120px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">1)</p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">BORROWER’S failure to pay any amount due as principal or interest on the date required under this loan agreement.</p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:22px; WIDTH:120px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; CLEAR:left; FONT-SIZE:12pt">2)</p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">BORROWER seeks an order of relief under the Federal Bankruptcy laws.</p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:22px; WIDTH:120px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; CLEAR:left; FONT-SIZE:12pt">3)</p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">A federal tax lien is filed against the assets of BORROWER.</p>
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>F.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Additional Provisions Regarding Default.</b>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:22px; WIDTH:120px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; CLEAR:left; FONT-SIZE:12pt">1)</p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">Addressee and Address to which LENDER is to give BORROWER written notice of default:</p>
                  <p style="MARGIN-TOP:8px; PADDING-LEFT:144px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:0px; CLEAR:left; FONT-SIZE:12pt">N/A</p>
                  <p style="MARGIN-TOP:8px; MARGIN-BOTTOM:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">If BORROWER gives written notice to LENDER that a different address shall be used, LENDER shall use that address for giving notice of default (or any other notice called for herein) to BORROWER.</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:22px; WIDTH:120px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>2)</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Cure of Default.</b> &nbsp;Upon default, LENDER shall give BORROWER written notice of default. &nbsp;Mailing of written notice by LENDER to BORROWER via U.S. Postal Service Certified Mail shall constitute prima facie evidence of delivery. &nbsp;BORROWER shall have 15 days after receipt of written notice of default from LENDER to cure said default. &nbsp;In the case of default due solely to BORROWER’S failure to make timely payment as called for in this loan agreement, BORROWER may cure the default by either: &nbsp;(i) making full payment of any principal and accrued interest (including interest on these amounts) whose payment to LENDER is overdue under the loan agreement and, also, the late-payment penalty described below; or (ii) release collateral to LENDER as described in paragraph B “Collateral”, above. &nbsp;
                  </p>
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:22px; WIDTH:120px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>3)</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Penalty for Late Payment.</b> &nbsp;There shall also be imposed upon BORROWER a <u>2% penalty</u> for any late payment computed upon the amount of any principal and accrued interest whose payment to
                  </p>
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                    <br>
                  </p>
                
                  <p style="MARGIN:0px">
                    <br>
                  </p>
              
                  <p style="PAGE-BREAK-BEFORE:always; MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">LENDER is overdue under this loan agreement <u>and</u> for which LENDER has delivered a notice of default to BORROWER </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:22px; WIDTH:120px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>4)</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:120px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Indemnification of Attorneys Fees and Out-of-Pocket Costs.</b> &nbsp;Should any party materially breach this agreement, the non-breaching party shall be indemnified by the breaching party for its reasonable attorneys fees and out-of-pocket costs which in any way relate to, or were precipitated by, the breach of this agreement. &nbsp;The term “out-of-pocket costs”, as used herein, shall <u>not</u> include lost profits. &nbsp;A default by BORROWER which is not cured within 15 days after receiving a written notice of default from LENDER constitutes a material breach of this agreement by BORROWER.
                  </p>
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>G.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Parties That Are </b>
                    <b>
                      <u>Not</u>
                    </b>
                    <b> Individuals.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">If any Party to this agreement is other than an individual (i.e., a corporation, a Limited Liability Company, a Partnership, or a Trust), said Party, and the individual signing on behalf of said Party, hereby represents and warrants that all steps and actions have been taken under the entity’s governing instruments to authorize the entry into this Loan Agreement. &nbsp;Breach of any representation contained in this paragraph is considered a material breach of the Loan Agreement.</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>H.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Integration.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">This Agreement, including the attachments mentioned in the body as incorporated by reference, sets forth the entire agreement between the Parties with regard to the subject matter hereof. &nbsp;All prior agreements, representations and warranties, express or implied, oral or written, with respect to the subject matter hereof, are superseded by this agreement. &nbsp;This is an integrated agreement.</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>I.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Severability.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">In the event any provision of this Agreement is deemed to be void, invalid, or unenforceable, that provision shall be severed from the remainder of this Agreement so as not to cause the invalidity or unenforceability of the remainder of this Agreement. &nbsp;All remaining provisions of this Agreement shall then continue in full force and effect. &nbsp;If any provision shall be deemed invalid due to its scope or breadth, such provision shall be deemed valid to the extent of the scope and breadth permitted by law. </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>J.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Modification.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">Except as otherwise provided in this document, this agreement may be modified, superseded, or voided <u>only</u> upon the written and signed agreement of the Parties. &nbsp;Further, the physical destruction or loss of this document shall not be construed as a modification or termination of the agreement contained herein. &nbsp; </p>
                  <p style="MARGIN:0px">
                    <br>
                    <br>
                  </p>
               
                  <p style="MARGIN:0px">
                    <br>
                  </p>
            
                  <p style="PAGE-BREAK-BEFORE:always; MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>K.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>Exclusive Jurisdiction for Suit in Case of Breach.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">The Parties, by entering into this agreement, submit to jurisdiction in State of New Mexico for adjudication of any disputes and/or claims between the Parties under this agreement. &nbsp;Furthermore, the Parties hereby agree that the courts of State of Pennsylvania shall have <b>exclusive</b> jurisdiction over any disputes between the parties relative to this agreement, whether said disputes sounds in contract, tort, or other areas of the law. </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; TEXT-INDENT:24px; WIDTH:48px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>L.</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>State Law.</b>
                  </p>
                  <p style="MARGIN:0px; PADDING-LEFT:48px; FONT-FAMILY:Calibri,Times New Roman; CLEAR:left; FONT-SIZE:12pt">This Agreement shall be interpreted under, and governed by, the laws of the State of New Mexico.</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">IN WITNESS WHEREOF and acknowledging acceptance and agreement of the foregoing, BORROWER and LENDER affix their signatures hereto.</p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; WIDTH:180px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">
                    <b>BORROWER: &nbsp;</b>
                  </p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>LENDER</b>
                  </p>
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                  </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; WIDTH:180px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">${firstName} ${lastName}_________</p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">&nbsp;&nbsp;Kevin Wachtell________</p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">
                    <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Borrower’s Signature&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mesa Verde Bank & Trust</b>
                  </p>
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                  </p>
                  <p style="MARGIN-TOP:0px; WIDTH:180px; FONT-FAMILY:Calibri,Times New Roman; MARGIN-BOTTOM:-2px; FLOAT:left; FONT-SIZE:12pt">Dated: ${date}</p>
                  <p style="TEXT-INDENT:-2px; MARGIN:0px; FONT-FAMILY:Calibri,Times New Roman; FONT-SIZE:12pt">Dated: ${date}</p>
                  <p style="MARGIN:0px; CLEAR:left">
                    <br>
                  </p>
                  <p style="MARGIN:0px">
                    <br>
                    <br>
                  </p>
             
                  <p style="MARGIN:0px">
                    <br>
                  </p>
                </div>
              </text>
            </description>
          </filename>
        </sequence>
      
    </document>
  </body>`;
}
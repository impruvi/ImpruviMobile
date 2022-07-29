import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import HeaderCenter from "../components/HeaderCenter";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faAngleLeft} from "@fortawesome/pro-light-svg-icons";
import {useNavigation} from "@react-navigation/native";

const TermsAndConditionsScreen = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex: 1}}>
            <HeaderCenter title={'Terms and conditions'}
                          left={<FontAwesomeIcon icon={faAngleLeft} style={{fontSize: 80}} size={30}/>}
                          onLeftPress={navigation.goBack}/>
            <ScrollView style={{paddingHorizontal: 20}}>
                <Text style={styles.header1}>
                    Terms and Conditions of impruviapp.com
                </Text>
                <Text style={styles.section}>
                    These Terms govern
                </Text>
                <Text style={styles.section}>
                    • the use of this Application, and,
                </Text>
                <Text style={styles.section}>
                    • any other related Agreement or legal relationship with the Owner
                </Text>
                <Text style={styles.section}>
                    in a legally binding way. Capitalized words are defined in the relevant dedicated section of this document.
                </Text>
                <Text style={styles.section}>
                    The User must read this document carefully.
                </Text>

                <Text style={styles.section}>
                    Although the entire contractual relationship relating to these Products is entered into solely by
                    the Owner and Users, Users acknowledge and agree that, where this Application has been provided to
                    them via the Apple App Store, Apple may enforce these Terms as a third-party beneficiary.
                </Text>

                <Text style={styles.section}>
                    This Application is provided by:
                </Text>
                <Text style={styles.section}>
                    Levitate Sports LLC - 3627 Stone Way N
                </Text>
                <Text style={styles.section}>
                    Owner contact email: ryancrowleysoccer@gmail.com
                </Text>

                <Text style={styles.header2}>What the User should know at a glance</Text>
                <Text style={styles.section}>
                    • Please note that some provisions in these Terms may only apply to certain categories of Users.
                    In particular, certain provisions may only apply to Consumers or to those Users that do not qualify as
                    Consumers. Such limitations are always explicitly mentioned within each affected clause. In the absence
                    of any such mention, clauses apply to all Users.
                </Text>
                <Text style={styles.section}>
                    • The right of withdrawal only applies to European Consumers. The right of withdrawal, also commonly
                    called the right of cancellation in the UK, is consistently referred to as “the right of withdrawal”
                    within this document.
                </Text>

                <Text style={styles.header2}>Terms of use</Text>
                <Text style={styles.section}>
                    Unless otherwise specified, the terms of use detailed in this section apply generally when using this Application.
                </Text>
                <Text style={styles.section}>
                    Single or additional conditions of use or access may apply in specific scenarios and in such cases are additionally indicated within this document.
                </Text>
                <Text style={styles.section}>
                    By using this Application, Users confirm to meet the following requirements:
                </Text>
                <Text style={styles.section}>
                    • There are no restrictions for Users in terms of being Consumers or Business Users;
                </Text>
                <Text style={styles.section}>
                    • Users aren’t located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a “terrorist-supporting” country;
                </Text>
                <Text style={styles.section}>
                    • Users aren’t listed on any U.S. Government list of prohibited or restricted parties;
                </Text>

                <Text style={styles.header3}>Content on this Application</Text>
                <Text style={styles.section}>
                    Unless where otherwise specified or clearly recognizable, all content available on this Application is owned or provided by the Owner or its licensors.
                </Text>
                <Text style={styles.section}>
                    The Owner undertakes its utmost effort to ensure that the content provided on this Application
                    infringes no applicable legal provisions or third-party rights. However, it may not always be possible
                    to achieve such a result.
                </Text>
                <Text style={styles.section}>
                    In such cases, without prejudice to any legal prerogatives of Users to enforce their rights,
                    Users are kindly asked to preferably report related complaints using the contact details provided in this document.
                </Text>

                <Text style={styles.header4}>Rights regarding content on this Application - All rights reserved</Text>
                <Text style={styles.section}>
                    The Owner holds and reserves all intellectual property rights for any such content.
                </Text>
                <Text style={styles.section}>
                    Users may not therefore use such content in any way that is not necessary or implicit in the proper use of the Service.
                </Text>
                <Text style={styles.section}>
                    In particular, but without limitation, Users may not copy, download, share (beyond the limits set forth below), modify, translate, transform, publish, transmit, sell, sublicense, edit, transfer/assign to third parties or create derivative works from the content available on this Application, nor allow any third party to do so through the User or their device, even without the User's knowledge.
                </Text>
                <Text style={styles.section}>
                    Where explicitly stated on this Application, the User may download, copy and/or share some content available through this Application for its sole personal and non-commercial use and provided that the copyright attributions and all the other attributions requested by the Owner are correctly implemented.
                </Text>
                <Text style={styles.section}>
                    Any applicable statutory limitation or exception to copyright shall stay unaffected.
                </Text>

                <Text style={styles.header3}>Access to external resources</Text>
                <Text style={styles.section}>
                    Through this Application Users may have access to external resources provided by third parties. Users acknowledge and accept that the Owner has no control over such resources and is therefore not responsible for their content and availability.
                </Text>
                <Text style={styles.section}>
                    Conditions applicable to any resources provided by third parties, including those applicable to any possible grant of rights in content, result from each such third parties’ terms and conditions or, in the absence of those, applicable statutory law.
                </Text>

                <Text style={styles.header3}>Acceptable use</Text>
                <Text style={styles.section}>
                    This Application and the Service may only be used within the scope of what they are provided for, under these Terms and applicable law.
                </Text>
                <Text style={styles.section}>
                    Users are solely responsible for making sure that their use of this Application and/or the Service violates no applicable law, regulations or third-party rights
                </Text>
                <Text style={styles.section}>
                    Therefore, the Owner reserves the right to take any appropriate measure to protect its legitimate
                    interests including by denying Users access to this Application or the Service, terminating contracts,
                    reporting any misconduct performed through this Application or the Service to the competent authorities –
                    such as judicial or administrative authorities - whenever Users engage or are suspected to engage
                    in any of the following activities:
                </Text>
                <Text style={styles.section}>
                    • violate laws, regulations and/or these Terms;
                </Text>
                <Text style={styles.section}>
                    • infringe any third-party rights;
                </Text>
                <Text style={styles.section}>
                    • considerably impair the Owner’s legitimate interests;
                </Text>
                <Text style={styles.section}>
                    • offend the Owner or any third party.
                </Text>

                <Text style={styles.header3}>Software license</Text>
                <Text style={styles.section}>
                    Any intellectual or industrial property rights, and any other exclusive rights on software or
                    technical applications embedded in or related to this Application are held by the Owner and/or its licensors.
                </Text>
                <Text style={styles.section}>
                    Subject to Users’ compliance with and notwithstanding any divergent provision of these Terms,
                    the Owner merely grants Users a revocable, non-exclusive, non-sublicensable and non-transferable
                    license to use the software and/or any other technical means embedded in the Service within the
                    scope and for the purposes of this Application and the Service offered.
                </Text>
                <Text style={styles.section}>
                    This license does not grant Users any rights to access, usage or disclosure of the original source
                    code. All techniques, algorithms, and procedures contained in the software and any documentation
                    thereto related is the Owner’s or its licensors’ sole property.
                </Text>
                <Text style={styles.section}>
                    All rights and license grants to Users shall immediately terminate upon any termination or expiration of the Agreement.
                </Text>
                <Text style={styles.section}>
                    Without prejudice to the above, under this license Users may download, install, use and run the
                    software on the permitted number of devices, provided that such devices are common and up-to-date
                    in terms of technology and market standards.
                </Text>
                <Text style={styles.section}>
                    The Owner reserves the right to release updates, fixes and further developments of this Application
                    and/or its related software and to provide them to Users for free. Users may need to download and
                    install such updates to continue using this Application and/or its related software.
                </Text>
                <Text style={styles.section}>
                    New releases may only be available against payment of a fee.
                </Text>
                <Text style={styles.section}>
                    The User may download, install, use and run the software on unlimited devices.
                </Text>
                <Text style={styles.section}>
                    However, it may not be permitted to run the software on more than one device at a time
                </Text>

                <Text style={styles.header2}>Terms and conditions of sale</Text>
                <Text style={styles.header3}>Paid Products</Text>
                <Text style={styles.section}>
                    Some of the Products provided on this Application, as part of the Service, are provided on the basis of payment.
                </Text>
                <Text style={styles.section}>
                    The fees, duration and conditions applicable to the purchase of such Products are described below and in the dedicated sections of this Application.
                </Text>

                <Text style={styles.header3}>Product description</Text>
                <Text style={styles.section}>
                    Prices, descriptions or availability of Products are outlined in the respective sections of this Application and are subject to change without notice.
                </Text>
                <Text style={styles.section}>
                    While Products on this Application are presented with the greatest accuracy technically possible,
                    representation on this Application through any means (including, as the case may be, graphic material,
                    images, colors, sounds) is for reference only and implies no warranty as to the characteristics
                    of the purchased Product.
                </Text>
                <Text style={styles.section}>
                    The characteristics of the chosen Product will be outlined during the purchasing process.
                </Text>

                <Text style={styles.header3}>Purchasing process</Text>
                <Text style={styles.section}>
                    Any steps taken from choosing a Product to order submission form part of the purchasing process.
                </Text>
                <Text style={styles.section}>
                    The purchasing process includes these steps:
                </Text>
                <Text style={styles.section}>
                    • Users must choose the desired Product and verify their purchase selection.
                </Text>
                <Text style={styles.section}>
                    • After having reviewed the information displayed in the purchase selection, Users may place the order by submitting it.
                </Text>

                <Text style={styles.header3}>Order submission</Text>
                <Text style={styles.section}>
                    When the User submits an order, the following applies:
                </Text>
                <Text style={styles.section}>
                    • The submission of an order determines contract conclusion and therefore creates for the User the
                    obligation to pay the price, taxes and possible further fees and expenses, as specified on the order page.
                </Text>
                <Text style={styles.section}>
                    • In case the purchased Product requires active input from the User, such as the provision of
                    personal information or data, specifications or special wishes, the order submission
                    creates an obligation for the User to cooperate accordingly.
                </Text>
                <Text style={styles.section}>
                    • Upon submission of the order, Users will receive a receipt confirming that the order has been received.
                </Text>
                <Text style={styles.section}>
                    All notifications related to the described purchasing process shall be sent to the email address provided by the User for such purposes.
                </Text>

                <Text style={styles.header3}>Prices</Text>
                <Text style={styles.section}>
                    Users are informed during the purchasing process and before order submission, about any fees, taxes and costs (including, if any, delivery costs) that they will be charged.
                </Text>
                <Text style={styles.section}>
                    Prices on this Application are displayed:
                </Text>
                <Text style={styles.section}>
                    • either exclusive or inclusive of any applicable fees, taxes and costs, depending on the section the User is browsing.
                </Text>

                <Text style={styles.header3}>Methods of payment</Text>
                <Text style={styles.section}>
                    Information related to accepted payment methods are made available during the purchasing process.
                </Text>
                <Text style={styles.section}>
                    Some payment methods may only be available subject to additional conditions or fees. In such cases
                    related information can be found in the dedicated section of this Application.
                </Text>
                <Text style={styles.section}>
                    All payments are independently processed through third-party services. Therefore,
                    this Application does not collect any payment information – such as credit card details –
                    but only receives a notification once the payment has been successfully completed.
                </Text>
                <Text style={styles.section}>
                    If a payment through the available methods fails or is refused by the payment service provider,
                    the Owner shall be under no obligation to fulfill the purchase order. Any possible costs or fees
                    resulting from the failed or refused payment shall be borne by the User.
                </Text>

                <Text style={styles.header3}>Retention of usage rights</Text>
                <Text style={styles.section}>
                    Users do not acquire any rights to use the purchased Product until the total purchase price is received by the Owner.
                </Text>

                <Text style={styles.header3}>Delivery</Text>
                <Text style={styles.header4}>Performance of services</Text>
                <Text style={styles.section}>
                    The purchased service shall be performed or made available within the timeframe specified on this Application or as communicated before the order submission.
                </Text>

                <Text style={styles.header3}>Contract duration</Text>
                <Text style={styles.header4}>Trial period</Text>
                <Text style={styles.section}>
                    Users have the option to test this Application or selected Products during a limited and non-renewable trial period, at no cost. Some features or functions of this Application may not be available to Users during the trial period.
                </Text>
                <Text style={styles.section}>
                    Further conditions applicable to the trial period, including its duration, will be specified on this Application.
                </Text>
                <Text style={styles.section}>
                    The trial period shall automatically convert into the equivalent paid Product, unless the User cancels the purchase before the trial period expires.
                </Text>

                <Text style={styles.header4}>Subscriptions</Text>
                <Text style={styles.section}>
                    Subscriptions allow Users to receive a Product continuously or regularly over time. Details regarding the type of subscription and termination are outlined below.
                </Text>

                <Text style={styles.header4}>Open-ended subscriptions</Text>
                <Text style={styles.section}>
                    Paid subscriptions begin on the day the payment is received by the Owner.
                </Text>
                <Text style={styles.section}>
                    In order to maintain subscriptions, Users must pay the required recurring fee in a timely manner. Failure to do so may cause service interruptions.
                </Text>

                <Text style={styles.header4}>Termination of open-ended subscriptions</Text>
                <Text style={styles.section}>
                    Open-ended subscriptions may be terminated at any time by sending a clear and unambiguous termination notice to the Owner using the contact details provided in this document, or — if applicable — by using the corresponding controls inside this Application.
                </Text>
                <Text style={styles.section}>
                    Terminations shall take effect 3 days after the notice of termination has been received by the Owner.
                </Text>
                <Text style={styles.header2}>User rights</Text>
                <Text style={styles.header3}>Right of withdrawal</Text>
                <Text style={styles.section}>
                    Unless exceptions apply, the User may be eligible to withdraw from the contract within the period specified below (generally 14 days), for any reason and without justification. Users can learn more about the withdrawal conditions within this section.
                </Text>

                <Text style={styles.header4}>Who the right of withdrawal applies to</Text>
                <Text style={styles.section}>
                    Unless any applicable exception is mentioned below, Users who are European Consumers are granted
                    a statutory cancellation right under EU rules, to withdraw from contracts entered into online
                    (distance contracts) within the specified period applicable to their case, for any reason and without justification.
                </Text>
                <Text style={styles.section}>
                    Users that do not fit this qualification, cannot benefit from the rights described in this section.
                </Text>

                <Text style={styles.header4}>Exercising the right of withdrawal</Text>
                <Text style={styles.section}>
                    To exercise their right of withdrawal, Users must send to the Owner an unequivocal statement of their intention to withdraw from the contract.
                </Text>
                <Text style={styles.section}>
                    To this end, Users may use the model withdrawal form available from within the “definitions” section
                    of this document. Users are, however, free to express their intention to withdraw from the contract
                    by making an unequivocal statement in any other suitable way. In order to meet the deadline within
                    which they can exercise such right, Users must send the withdrawal notice before the withdrawal period expires.
                </Text>
                <Text style={styles.section}>
                    When does the withdrawal period expire?
                </Text>
                <Text style={styles.section}>
                    • In case of purchase of a digital content not supplied in a tangible medium, the withdrawal period
                    expires 14 days after the day that the contract is entered into, unless the User has waived the withdrawal right.
                </Text>

                <Text style={styles.header4}>Effects of withdrawal</Text>
                <Text style={styles.section}>
                    Users who correctly withdraw from a contract will be reimbursed by the Owner for all payments made
                    to the Owner, including, if any, those covering the costs of delivery.
                </Text>
                <Text style={styles.section}>
                    However, any additional costs resulting from the choice of a particular delivery method other than
                    the least expensive type of standard delivery offered by the Owner, will not be reimbursed.
                </Text>
                <Text style={styles.section}>
                    Such reimbursement shall be made without undue delay and, in any event, no later than 14 days from
                    the day on which the Owner is informed of the User’s decision to withdraw from the contract. Unless
                    otherwise agreed with the User, reimbursements will be made using the same means of payment as used
                    to process the initial transaction. In any event, the User shall not incur any costs or fees as a
                    result of such reimbursement.
                </Text>

                <Text style={styles.header2}>Liability and indemnification</Text>
                <Text style={styles.header3}>Australian Users</Text>

                <Text style={styles.header4}>Limitation of liability</Text>
                <Text style={styles.section}>
                    Nothing in these Terms excludes, restricts or modifies any guarantee, condition, warranty, right or
                    remedy which the User may have under the Competition and Consumer Act 2010 (Cth) or any similar
                    State and Territory legislation and which cannot be excluded, restricted or modified
                    (non-excludable right). To the fullest extent permitted by law, our liability to the User,
                    including liability for a breach of a non-excludable right and liability which is not otherwise
                    excluded under these Terms of Use, is limited, at the Owner’s sole discretion, to the re-performance
                    of the services or the payment of the cost of having the services supplied again.
                </Text>

                <Text style={styles.header3}>US Users</Text>
                <Text style={styles.header4}>Disclaimer of Warranties</Text>
                <Text style={styles.section}>
                    This Application is provided strictly on an “as is” and “as available” basis. Use of the Service
                    is at Users’ own risk. To the maximum extent permitted by applicable law, the Owner expressly
                    disclaims all conditions, representations, and warranties — whether express, implied, statutory or
                    otherwise, including, but not limited to, any implied warranty of merchantability, fitness for a
                    particular purpose, or non-infringement of third-party rights. No advice or information, whether
                    oral or written, obtained by user from owner or through the Service will create any warranty not
                    expressly stated herein.
                </Text>
                <Text style={styles.section}>
                    Without limiting the foregoing, the Owner, its subsidiaries, affiliates, licensors, officers,
                    directors, agents, co-branders, partners, suppliers and employees do not warrant that the content
                    is accurate, reliable or correct; that the Service will meet Users’ requirements; that the Service
                    will be available at any particular time or location, uninterrupted or secure; that any defects or
                    errors will be corrected; or that the Service is free of viruses or other harmful components.
                    Any content downloaded or otherwise obtained through the use of the Service is downloaded at
                    users own risk and users shall be solely responsible for any damage to Users’ computer system or
                    mobile device or loss of data that results from such download or Users’ use of the Service.
                </Text>
                <Text style={styles.section}>
                    The Owner does not warrant, endorse, guarantee, or assume responsibility for any product or service
                    advertised or offered by a third party through the Service or any hyperlinked website or service,
                    and the Owner shall not be a party to or in any way monitor any transaction between Users and
                    third-party providers of products or services.
                </Text>
                <Text style={styles.section}>
                    The Service may become inaccessible or it may not function properly with Users’ web browser,
                    mobile device, and/or operating system. The owner cannot be held liable for any perceived or
                    actual damages arising from Service content, operation, or use of this Service.
                </Text>
                <Text style={styles.section}>
                    Federal law, some states, and other jurisdictions, do not allow the exclusion and limitations of
                    certain implied warranties. The above exclusions may not apply to Users. This Agreement gives Users
                    specific legal rights, and Users may also have other rights which vary from state to state. The
                    disclaimers and exclusions under this agreement shall not apply to the extent prohibited by applicable law.
                </Text>

                <Text style={styles.header4}>Limitations of liability</Text>
                <Text style={styles.section}>
                    To the maximum extent permitted by applicable law, in no event shall the Owner, and its subsidiaries,
                    affiliates, officers, directors, agents, co-branders, partners, suppliers and employees be liable for
                </Text>
                <Text style={styles.section}>
                    • any indirect, punitive, incidental, special, consequential or exemplary damages, including without
                    limitation damages for loss of profits, goodwill, use, data or other intangible losses, arising out
                    of or relating to the use of, or inability to use, the Service; and
                </Text>
                <Text style={styles.section}>
                    • any damage, loss or injury resulting from hacking, tampering or other unauthorized access or use
                    of the Service or User account or the information contained therein;
                </Text>
                <Text style={styles.section}>
                    • any errors, mistakes, or inaccuracies of content;
                </Text>
                <Text style={styles.section}>
                    • personal injury or property damage, of any nature whatsoever, resulting from User access to or use of the Service;
                </Text>
                <Text style={styles.section}>
                    • any unauthorized access to or use of the Owner’s secure servers and/or any and all personal information stored therein;
                </Text>
                <Text style={styles.section}>
                    • any interruption or cessation of transmission to or from the Service;
                </Text>
                <Text style={styles.section}>
                    • any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service;
                </Text>
                <Text style={styles.section}>
                    • any errors or omissions in any content or for any loss or damage incurred as a result of the use of
                    any content posted, emailed, transmitted, or otherwise made available through the Service; and/or
                </Text>
                <Text style={styles.section}>
                    • the defamatory, offensive, or illegal conduct of any User or third party. In no event shall the
                    Owner, and its subsidiaries, affiliates, officers, directors, agents, co-branders, partners,
                    suppliers and employees be liable for any claims, proceedings, liabilities, obligations, damages,
                    losses or costs in an amount exceeding the amount paid by User to the Owner hereunder in the preceding
                    12 months, or the period of duration of this agreement between the Owner and User, whichever is shorter.
                </Text>
                <Text style={styles.section}>
                    This limitation of liability section shall apply to the fullest extent permitted by law in the
                    applicable jurisdiction whether the alleged liability is based on contract, tort, negligence,
                    strict liability, or any other basis, even if company has been advised of the possibility of such damage.
                </Text>
                <Text style={styles.section}>
                    Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages,
                    therefore the above limitations or exclusions may not apply to User. The terms give User specific
                    legal rights, and User may also have other rights which vary from jurisdiction to jurisdiction.
                    The disclaimers, exclusions, and limitations of liability under the terms shall not apply to the
                    extent prohibited by applicable law.
                </Text>

                <Text style={styles.header4}>Indemnification</Text>
                <Text style={styles.section}>
                    The User agrees to defend, indemnify and hold the Owner and its subsidiaries, affiliates, officers,
                    directors, agents, co-branders, partners, suppliers and employees harmless from and against any and
                    all claims or demands, damages, obligations, losses, liabilities, costs or debt, and expenses,
                    including, but not limited to, legal fees and expenses, arising from
                </Text>
                <Text style={styles.section}>
                    • User’s use of and access to the Service, including any data or content transmitted or received by User;
                </Text>
                <Text style={styles.section}>
                    • User’s violation of these terms, including, but not limited to, User’s breach of any of the representations and warranties set forth in these terms;
                </Text>
                <Text style={styles.section}>
                    • User’s violation of any third-party rights, including, but not limited to, any right of privacy or intellectual property rights;
                </Text>
                <Text style={styles.section}>
                    • User’s violation of any statutory law, rule, or regulation;
                </Text>
                <Text style={styles.section}>
                    • any content that is submitted from User’s account, including third party access with User’s
                    unique username, password or other security measure, if applicable, including, but not limited to,
                    misleading, false, or inaccurate information;
                </Text>
                <Text style={styles.section}>
                    • User’s wilful misconduct; or
                </Text>
                <Text style={styles.section}>
                    • statutory provision by User or its affiliates, officers, directors, agents, co-branders, partners,
                    suppliers and employees to the extent allowed by applicable law.
                </Text>

                <Text style={styles.header2}>Common provisions</Text>

                <Text style={styles.header3}>No Waiver</Text>
                <Text style={styles.section}>
                    The Owner’s failure to assert any right or provision under these Terms shall not constitute a waiver
                    of any such right or provision. No waiver shall be considered a further or continuing waiver of such term or any other term.
                </Text>

                <Text style={styles.header3}>Service interruption</Text>
                <Text style={styles.section}>
                    To ensure the best possible service level, the Owner reserves the right to interrupt the Service for maintenance, system updates or any other changes, informing the Users appropriately.
                </Text>
                <Text style={styles.section}>
                    Within the limits of law, the Owner may also decide to suspend or terminate the Service altogether. If the Service is terminated, the Owner will cooperate with Users to enable them to withdraw Personal Data or information in accordance with applicable law.
                </Text>
                <Text style={styles.section}>
                    Additionally, the Service might not be available due to reasons outside the Owner’s reasonable control, such as “force majeure” (eg. labor actions, infrastructural breakdowns or blackouts etc).
                </Text>

                <Text style={styles.header3}>Service reselling</Text>
                <Text style={styles.section}>
                    Users may not reproduce, duplicate, copy, sell, resell or exploit any portion of this Application and of its Service without the Owner’s express prior written permission, granted either directly or through a legitimate reselling programme.
                </Text>

                <Text style={styles.header3}>Privacy policy</Text>
                <Text style={styles.section}>
                    For information about the use of their personal data, Users must refer to the privacy policy of this Application which is hereby declared to be part of these Terms.
                </Text>

                <Text style={styles.header3}>Intellectual property rights</Text>
                <Text style={styles.section}>
                    Without prejudice to any more specific provision of these Terms, any intellectual property rights, such as copyrights, trademark rights, patent rights and design rights related to this Application are the exclusive property of the Owner or its licensors and are subject to the protection granted by applicable laws or international treaties relating to intellectual property.
                </Text>
                <Text style={styles.section}>
                    All trademarks — nominal or figurative — and all other marks, trade names, service marks, word marks, illustrations, images, or logos appearing in connection with this Application are, and remain, the exclusive property of the Owner or its licensors and are subject to the protection granted by applicable laws or international treaties related to intellectual property.
                </Text>

                <Text style={styles.header3}>Changes to these Terms</Text>
                <Text style={styles.section}>
                    The Owner reserves the right to amend or otherwise modify these Terms at any time. In such cases, the Owner will appropriately inform the User of these changes.
                </Text>
                <Text style={styles.section}>
                    Such changes will only affect the relationship with the User for the future.
                </Text>
                <Text style={styles.section}>
                    The continued use of the Service will signify the User’s acceptance of the revised Terms. If Users do
                    not wish to be bound by the changes, they must stop using the Service. Failure to accept the revised Terms,
                    may entitle either party to terminate the Agreement.
                </Text>
                <Text style={styles.section}>
                    The applicable previous version will govern the relationship prior to the User's acceptance. The User can obtain any previous version from the Owner.
                </Text>
                <Text style={styles.section}>
                    If required by applicable law, the Owner will specify the date by which the modified Terms will enter into force.
                </Text>

                <Text style={styles.header3}>Assignment of contract</Text>
                <Text style={styles.section}>
                    The Owner reserves the right to transfer, assign, dispose of by novation, or subcontract any or all
                    rights or obligations under these Terms, taking the User’s legitimate interests into account.
                    Provisions regarding changes of these Terms will apply accordingly.
                </Text>
                <Text style={styles.section}>
                    Users may not assign or transfer their rights or obligations under these Terms in any way, without the written permission of the Owner.
                </Text>

                <Text style={styles.header3}>Contacts</Text>
                <Text style={styles.section}>
                    All communications relating to the use of this Application must be sent using the contact information
                    stated in this document.
                </Text>

                <Text style={styles.header3}>Severability</Text>
                <Text style={styles.section}>
                    Should any provision of these Terms be deemed or become invalid or unenforceable under applicable law,
                    the invalidity or unenforceability of such provision shall not affect the validity of the remaining
                    provisions, which shall remain in full force and effect.
                </Text>

                <Text style={styles.header4}>US Users</Text>
                <Text style={styles.section}>
                    Any such invalid or unenforceable provision will be interpreted, construed and reformed to the extent
                    reasonably required to render it valid, enforceable and consistent with its original intent. These
                    Terms constitute the entire Agreement between Users and the Owner with respect to the subject matter
                    hereof, and supersede all other communications, including but not limited to all prior agreements,
                    between the parties with respect to such subject matter. These Terms will be enforced to the fullest
                    extent permitted by law.
                </Text>

                <Text style={styles.header4}>EU Users</Text>
                <Text style={styles.section}>
                    Should any provision of these Terms be or be deemed void, invalid or unenforceable, the parties
                    shall do their best to find, in an amicable way, an agreement on valid and enforceable provisions
                    thereby substituting the void, invalid or unenforceable parts.
                </Text>
                <Text style={styles.section}>
                    In case of failure to do so, the void, invalid or unenforceable provisions shall be replaced by the
                    applicable statutory provisions, if so permitted or stated under the applicable law.
                </Text>
                <Text style={styles.section}>
                    Without prejudice to the above, the nullity, invalidity or the impossibility to enforce a particular
                    provision of these Terms shall not nullify the entire Agreement, unless the severed provisions are
                    essential to the Agreement, or of such importance that the parties would not have entered into the
                    contract if they had known that the provision would not be valid, or in cases where the remaining
                    provisions would translate into an unacceptable hardship on any of the parties.
                </Text>

                <Text style={styles.header3}>Governing law</Text>
                <Text style={styles.section}>
                    These Terms are governed by the law of the place where the Owner is based, as disclosed in the relevant section of this document, without regard to conflict of laws principles.
                </Text>

                <Text style={styles.header4}>Exception for European Consumers</Text>
                <Text style={styles.section}>
                    However, regardless of the above, if the User qualifies as a European Consumer and has their habitual
                    residence in a country where the law provides for a higher consumer protection standard, such higher standards shall prevail.
                </Text>

                <Text style={styles.header3}>Venue of jurisdiction</Text>
                <Text style={styles.section}>
                    The exclusive competence to decide on any controversy resulting from or connected to these Terms lies with the courts of the place where the Owner is based, as displayed in the relevant section of this document.
                </Text>

                <Text style={styles.header4}>Exception for European Consumers</Text>
                <Text style={styles.section}>
                    The above does not apply to any Users that qualify as European Consumers, nor to Consumers based in Switzerland, Norway or Iceland.
                </Text>
                <Text style={styles.header2}>Dispute resolution</Text>
                <Text style={styles.header3}>Amicable dispute resolution</Text>
                <Text style={styles.section}>
                    Users may bring any disputes to the Owner who will try to resolve them amicably.
                </Text>
                <Text style={styles.section}>
                    While Users' right to take legal action shall always remain unaffected, in the event of any
                    controversy regarding the use of this Application or the Service, Users are kindly asked to
                    contact the Owner at the contact details provided in this document.
                </Text>
                <Text style={styles.section}>
                    The User may submit the complaint including a brief description and if applicable, the details
                    of the related order, purchase, or account, to the Owner’s email address specified in this document.
                </Text>
                <Text style={styles.section}>
                    The Owner will process the complaint without undue delay and within 21 days of receiving it.
                </Text>

                <Text style={styles.header3}>Online dispute resolution for Consumers</Text>
                <Text style={styles.section}>
                    The European Commission has established an online platform for alternative dispute resolutions that
                    facilitates an out-of-court method for solving any dispute related to and stemming from online sale and service contracts.
                </Text>
                <Text style={styles.section}>
                    As a result, any European Consumer can use such platform for resolving any dispute stemming from contracts which have been entered into online. The platform is available at the following link.
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header1: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10
    },
    header2: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 10
    },
    header3: {
        fontSize: 14,
        fontWeight: '500'
    },
    header4: {
        fontSize: 12,
        fontWeight: '500'
    },
    section: {
        marginVertical: 5,
        color: '#888'
    }
});

export default TermsAndConditionsScreen;
import JournalEntryData from "../../models/journalEntry.model.js";

export const getSalesPurchase = async (req, res) => {
  try {
    const allJournalEntry = await JournalEntryData.find();
    res.status(200).json(allJournalEntry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSalesPurchase = async (req, res) => {
  // TODO: 하드코딩된 파라미터들 마스터데이터 컬렉션에서 읽어오는 것으로 수정 필요
  const clientData = req.body;
  console.log(clientData);

  // 전표번호 생성
  const numberOfDocuments = await JournalEntryData.countDocuments({
    documentType: clientData.documentType,
    documentDate: clientData.documentDate,
  });
  const documentNumber =
    (clientData.documentType === "sales" ? "S-" : "P-") +
    clientData.documentDate.replace(/-/gi, "") +
    "-" +
    (numberOfDocuments + 1);

  // 거래금액 집계
  var supplyAmount = 0;
  var vatAmount = 0;
  var sumAmount = 0;
  for (var i = 0; i < clientData.supplyAmounts.length; i++) {
    supplyAmount += clientData.supplyAmounts[i];
  }
  for (var i = 0; i < clientData.vatAmounts.length; i++) {
    vatAmount += clientData.vatAmounts[i];
  }
  for (var i = 0; i < clientData.sumAmounts.length; i++) {
    sumAmount += clientData.sumAmounts[i];
  }

  // 계정과목 및 금액 생성
  var debitAccount = [];
  var debitAmount = [];
  var creditAccount = [];
  var creditAmount = [];

  if (clientData.documentType === "sales") {
    // 대변
    if (supplyAmount > 0) {
      creditAccount.push("41000"); //매출액
      creditAmount.push(supplyAmount);
    }
    if (vatAmount > 0) {
      creditAccount.push("21004"); //부가세예수금
      creditAmount.push(vatAmount);
    }
    // 차변
    debitAmount.push(sumAmount);
    switch (clientData.paymentType) {
      case "credit":
        debitAccount.push("11105"); //외상매출금
        break;
      case "banking":
        debitAccount.push("11102"); //보통예금
        break;
      case "creditcard":
        debitAccount.push("11110"); //미수금
        break;
      case "cash":
        debitAccount.push("11101"); //현금및현금등가물
        break;
      case "giftcard":
        debitAccount.push("11104"); //유가증권
        break;
      case "emoney":
        debitAccount.push("11110"); //미수금
        break;
    }
  } else if (clientData.documentType === "purchase") {
    // 차변
    if (supplyAmount > 0) {
      debitAccount.push("11200"); // 재고자산
      debitAmount.push(supplyAmount);
    }
    if (vatAmount > 0) {
      debitAccount.push("11113"); //부가세대급금
      debitAmount.push(vatAmount);
    }
    // 대변
    creditAmount.push(sumAmount);
    switch (clientData.paymentType) {
      case "credit":
        creditAccount.push("21001"); //외상매입금
        break;
      case "banking":
        creditAccount.push("11102"); //보통예금
        break;
      case "creditcard":
        creditAccount.push("21007"); //미지급금
        break;
      case "cash":
        creditAccount.push("11101"); //현금및현금등가물
        break;
      case "giftcard":
        creditAccount.push("11104"); //유가증권
        break;
      case "emoney":
        creditAccount.push("21007"); //미지급금
        break;
    }
  }

  // mongodb document 생성
  const debit = [];
  for (var i = 0; i < debitAccount.length; i++) {
    debit.push({ account: debitAccount[i], amount: debitAmount[i] });
  }
  const credit = [];
  for (var i = 0; i < creditAccount.length; i++) {
    credit.push({ account: creditAccount[i], amount: creditAmount[i] });
  }

  const journalEntryDocument = Object.assign(clientData, {
    documentNumber: documentNumber,
    debit: debit,
    credit: credit,
  });

  const newJournalEntry = new JournalEntryData(journalEntryDocument);
  console.log(newJournalEntry);

  // mongodb document 저장
  try {
    await newJournalEntry.save();
    res.status(201).json(newJournalEntry);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export function getPackagesList() {
  return {
    type: "GET_PACKAGES",
    payload: {
      "packages": [
        {
          "packageId": "audit_journal",
          "packageName": "Audit Journal"
        },
        {
          "packageId": "test_pack1",
          "packageName": "Test data packageName"
        }
      ]
    }
  }
}
export function selectPackage(packageId) {
  if (packageId === 'audit_journal') {
    return {
      type: "SELECT_PACKAGE",
      payload: {
        "packageId": packageId,
        "views": [
          {
            "viewId": "view1",
            "viewName": "Journal Entries"
          },
          {
            "viewId": "view2",
            "viewName": "Compact Journal Entries"
          },
          {
            "viewId": "view3",
            "viewName": "Journal Changes"
          },
          {
            "viewId": "view4",
            "viewName": "Journal Changes"
          },
          {
            "viewId": "view5",
            "viewName": "Multi-referenced Invoices"
          },
          {
            "viewId": "view6",
            "viewName": "Gaps in Journal Entries Numbering"
          }
        ]
      }

    }
  } else {
    return {
      type: "SELECT_PACKAGE",
      payload: {
        "packageId": "test_pack1",
        "views": [
          {
            "viewId": "view1",
            "viewName": "Test View 1"
          },
          {
            "viewId": "view2",
            "viewName": "Test View 2 "
          }
        ]
      }
    }
  }
}


export function getViewsList(packageId) {
  return {
    type: "GET_PACKAGE_VIEWS",
    packageId
  }
}